import {AsyncComponent} from './async.component';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {DependentService} from '../services/dependent.service';
import {instance, mock, verify, when} from 'ts-mockito';
import {AsyncService} from './async.service';
import {of} from 'rxjs';

describe(`${AsyncComponent.name} | Component with async service:`, () => {
  describe('real service instance:', () => {
    // region Test Setup
    let component: AsyncComponent;
    let fixture: ComponentFixture<AsyncComponent>;
    let serviceMock: DependentService;

    beforeEach(() => {
      serviceMock = mock<DependentService>(DependentService);
    });

    beforeEach(() => {
      fixture = TestBed
        .configureTestingModule({
          declarations: [AsyncComponent],
          providers: [
            AsyncService,
            {provide: DependentService, useValue: instance(serviceMock)}
          ]
        })
        .overrideTemplate(AsyncComponent, '')
        .createComponent(AsyncComponent);

      component = fixture.componentInstance;

      fixture.detectChanges();
    });
    // endregion

    describe('timer:', () => {
      it('[sync]: should call callDoSmthInteresting method', () => {
        component.callTimer();

        verify(serviceMock.callDoSmthInteresting()).never();
      });

      it('[fakeAsync]: should call callDoSmthInteresting method', fakeAsync(() => {
        component.callTimer();
        tick(AsyncService.TIME);

        verify(serviceMock.callDoSmthInteresting()).once();
      }));
    });

    describe('debounce:', () => {
      it('[sync]: should call callDoSmthInteresting method', () => {
        component.callDebounce();

        verify(serviceMock.callDoSmthInteresting()).never();
      });

      it('[fakeAsync]: should call callDoSmthInteresting method', fakeAsync(() => {
        component.callDebounce();
        tick(AsyncService.TIME);

        verify(serviceMock.callDoSmthInteresting()).once();
      }));
    });
  });

  describe('mocked service:', () => {
    // region Test Setup
    let component: AsyncComponent;
    let fixture: ComponentFixture<AsyncComponent>;
    let serviceMock: DependentService;
    let asyncServiceMock: AsyncService;

    beforeEach(() => {
      serviceMock = mock<DependentService>(DependentService);
      asyncServiceMock = mock<AsyncService>(AsyncService);

      when(asyncServiceMock.debounce$()).thenReturn(of(null));
      when(asyncServiceMock.timer$()).thenReturn(of(null));
    });

    beforeEach(() => {
      fixture = TestBed
        .configureTestingModule({
          declarations: [AsyncComponent],
          providers: [
            {provide: AsyncService, useValue: instance(asyncServiceMock)},
            {provide: DependentService, useValue: instance(serviceMock)}
          ]
        })
        .overrideTemplate(AsyncComponent, '')
        .createComponent(AsyncComponent);

      component = fixture.componentInstance;

      fixture.detectChanges();
    });
    // endregion

    describe('timer:', () => {
      it('[sync]: should call callDoSmthInteresting method', () => {
        component.callTimer();

        verify(serviceMock.callDoSmthInteresting()).once();
      });
    });

    describe('debounce:', () => {
      it('[sync]: should call callDoSmthInteresting method', () => {
        component.callDebounce();

        verify(serviceMock.callDoSmthInteresting()).once();
      });
    });
  });
});
