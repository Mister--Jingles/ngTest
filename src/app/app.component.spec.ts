import {anything, capture, instance, mock, verify, when} from 'ts-mockito';

describe('jasmine VS ts-mockito:', () => {
  class Service {
    get smthInteresting(): string {
      return 'smth interesting';
    }

    method(arg?: string): string {
      return arg || 'method called';
    }
  }

  class MainService {
    constructor(private service: Service) {
    }

    callServiceGetter(): string {
      return this.service.smthInteresting;
    }

    callServiceMethod(arg?: string): string {
      return this.service.method(arg);
    }
  }

  describe('mock dependencies:', () => {
    it('jasmine', () => {
      const serviceMock = jasmine.createSpyObj<Service>(Service.name, ['method']);
      const mainService = new MainService(serviceMock);

      expect(mainService).toBeDefined();
    });

    it('ts-mockito', () => {
      const serviceMock = mock<Service>(Service);
      const mainService = new MainService(instance(serviceMock));

      expect(mainService).toBeDefined();
    });
  });

  describe('mock getters', () => {
    it('jasmine', () => {
      const fakeGetterValue = 'fake getter value';
      const serviceMock = jasmine.createSpyObj<Service>(Service.name, ['method']);
      const mainService = new MainService(serviceMock);

      Object.assign(serviceMock, {smthInteresting: fakeGetterValue});
      // spyOnProperty(serviceMock, 'smthInteresting', 'get').and.returnValue(fakeGetterValue);

      expect(mainService.callServiceGetter()).toBe(fakeGetterValue);
    });

    it('ts-mockito', () => {
      const fakeGetterValue = 'fake getter value';
      const serviceMock = mock<Service>(Service);
      const mainService = new MainService(instance(serviceMock));

      when(serviceMock.smthInteresting).thenReturn(fakeGetterValue);

      expect(mainService.callServiceGetter()).toBe(fakeGetterValue);
    });
  });

  describe('mock methods:', () => {
    it('jasmine', () => {
      const fakeMethodReturnedValue = 'fake value';
      const serviceMock = jasmine.createSpyObj<Service>(Service.name, ['method']);
      const mainService = new MainService(serviceMock);

      serviceMock.method.and.returnValue(fakeMethodReturnedValue);

      expect(mainService.callServiceMethod()).toBe(fakeMethodReturnedValue);
    });

    it('ts-mockito', () => {
      const fakeMethodReturnedValue = 'fake value';
      const serviceMock = mock<Service>(Service);
      const mainService = new MainService(instance(serviceMock));

      when(serviceMock.method(anything())).thenReturn(fakeMethodReturnedValue);

      expect(mainService.callServiceMethod()).toBe(fakeMethodReturnedValue);
    });
  });

  describe('check calls:', () => {
    it('jasmine', () => {
      const serviceMock = jasmine.createSpyObj<Service>(Service.name, ['method']);
      const mainService = new MainService(serviceMock);

      mainService.callServiceMethod();

      expect(serviceMock.method).toHaveBeenCalled();
    });

    it('ts-mockito', () => {
      const serviceMock = mock<Service>(Service);
      const mainService = new MainService(instance(serviceMock));

      mainService.callServiceMethod();

      verify(serviceMock.method(anything())).once();
    });
  });

  describe('capture method arguments:', () => {
    it('jasmine', () => {
      const ARG_STRING = '132';
      const serviceMock = jasmine.createSpyObj<Service>(Service.name, ['method']);
      const mainService = new MainService(serviceMock);

      mainService.callServiceMethod(ARG_STRING);

      expect(serviceMock.method).toHaveBeenCalledWith(ARG_STRING);
    });

    it('ts-mockito', () => {
      const ARG_STRING = '132';
      const serviceMock = mock<Service>(Service);
      const mainService = new MainService(instance(serviceMock));

      mainService.callServiceMethod(ARG_STRING);

      // 1
      verify(serviceMock.method(ARG_STRING)).once();

      // 2
      const [argValue] = capture(serviceMock.method).last();

      expect(argValue).toBe(ARG_STRING, 'capture failed');
    });
  });
});
