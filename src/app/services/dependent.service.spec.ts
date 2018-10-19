import {DependentService} from './dependent.service';
import {PlainService} from './plain.service';
import {instance, mock, verify} from 'ts-mockito';
import {TestBed} from '@angular/core/testing';

describe(`${DependentService.name} | Service with dependencies:`, () => {
  describe('handmade DI:', () => {
    let plainServiceMock: PlainService;
    let service: DependentService;

    beforeEach(() => {
      plainServiceMock = mock<PlainService>(PlainService);
      service = new DependentService(instance(plainServiceMock));
    });

    it('service should be created', () => {
      expect(service).toBeDefined();
    });

    it('should call doSmthInteresting method', () => {
      service.callDoSmthInteresting();

      verify(plainServiceMock.doSmthInteresting()).once();
    });
  });

  describe('angular DI:', () => {
    let plainServiceMock: PlainService;
    let service: DependentService;

    beforeEach(() => {
      plainServiceMock = mock(PlainService);

      TestBed.configureTestingModule({
        providers: [
          DependentService,
          {provide: PlainService, useValue: instance(plainServiceMock)}
        ]
      });

      service = TestBed.get(DependentService);
    });

    it('service should be created', () => {
      expect(service).toBeDefined();
    });

    it('should call doSmthInteresting method', () => {
      service.callDoSmthInteresting();

      verify(plainServiceMock.doSmthInteresting()).once();
    });
  });
});
