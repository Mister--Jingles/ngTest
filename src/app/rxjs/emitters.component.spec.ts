import {ComponentFixture, TestBed} from '@angular/core/testing';
import {instance, mock, verify, when} from 'ts-mockito';
import {EmittersComponent} from './emitters.component';
import {DependentService} from '../services/dependent.service';
import {Subject} from 'rxjs';
import {EmittersService} from './emitters.service';

describe(`${EmittersComponent.name} | Component with emitters:`, () => {
  // region Test Setup
  let component: EmittersComponent;
  let fixture: ComponentFixture<EmittersComponent>;
  let serviceMock: DependentService;
  let emittersServiceMock: EmittersService;

  beforeEach(() => {
    serviceMock = mock<DependentService>(DependentService);
    emittersServiceMock = mock<EmittersService>(EmittersService);
  });

  beforeEach(() => {
    fixture = TestBed
      .configureTestingModule({
        declarations: [EmittersComponent],
        providers: [
          {provide: EmittersService, useValue: instance(emittersServiceMock)},
          {provide: DependentService, useValue: instance(serviceMock)}
        ]
      })
      .overrideTemplate(EmittersComponent, '')
      .createComponent(EmittersComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });
  // endregion

  describe('single emitter:', () => {
    const fakeEmitter$ = new Subject<void>();

    beforeEach(() => {
      when(emittersServiceMock.getEmitter1$()).thenReturn(fakeEmitter$.asObservable());

      component.subscribeToEmitter();
    });

    it('should call callDoSmthInteresting on emitter event', () => {
      fakeEmitter$.next();

      verify(serviceMock.callDoSmthInteresting()).once();
    });

    it('should not call callDoSmthInteresting without emitter event', () => {
      verify(serviceMock.callDoSmthInteresting()).never();
    });
  });

  describe('multiple emitters:', () => {
    const fakeEmitter1$ = new Subject<void>();
    const fakeEmitter2$ = new Subject<void>();

    beforeEach(() => {
      when(emittersServiceMock.getEmitter1$()).thenReturn(fakeEmitter1$.asObservable());
      when(emittersServiceMock.getEmitter2$()).thenReturn(fakeEmitter2$.asObservable());

      component.subscribeToMultipleEmitters();
    });

    it('should not call callDoSmthInteresting without emitters events', () => {
      verify(serviceMock.callDoSmthInteresting()).never();
    });

    it('should not call callDoSmthInteresting without first emitter event', () => {
      fakeEmitter2$.next();

      verify(serviceMock.callDoSmthInteresting()).never();
    });

    it('should not call callDoSmthInteresting without second emitter event', () => {
      fakeEmitter1$.next();

      verify(serviceMock.callDoSmthInteresting()).never();
    });

    it('should call callDoSmthInteresting on both emitters events', () => {
      fakeEmitter1$.next();
      fakeEmitter2$.next();

      verify(serviceMock.callDoSmthInteresting()).once();
    });
  });
});
