import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DependentService} from '../services/dependent.service';
import {instance, mock, verify} from 'ts-mockito';
import {OwnServiceComponent} from './own-service.component';

describe(`${OwnServiceComponent.name} | Component with own providers:`, () => {
  // region TestSetup
  let fixture: ComponentFixture<OwnServiceComponent>;
  let serviceMock: DependentService;
  let component: OwnServiceComponent;

  beforeEach(() => {
    serviceMock = mock<DependentService>(DependentService);

    fixture = TestBed
      .configureTestingModule({
        declarations: [OwnServiceComponent]
      })
      .overrideComponent(OwnServiceComponent, {
        set: {
          template: '',
          providers: [
            {provide: DependentService, useValue: instance(serviceMock)}
          ]
        }
      })
      .createComponent(OwnServiceComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });
  // endregion

  it('component should be created', () => {
    expect(component).toBeDefined();
  });

  it('should call service callDoSmthInteresting method', () => {
    verify(serviceMock.callDoSmthInteresting()).once();
  });
});
