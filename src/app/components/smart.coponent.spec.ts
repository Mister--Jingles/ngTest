import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SmartComponent} from './smart.coponent';
import {DependentService} from '../services/dependent.service';
import {instance, mock, verify} from 'ts-mockito';

fdescribe(`${SmartComponent} | Test smart component with OnPush chd strategy:`, () => {
  // region TestSetup
  let fixture: ComponentFixture<SmartComponent>;
  let serviceMock: DependentService;
  let component: SmartComponent;

  beforeEach(() => {
    serviceMock = mock<DependentService>(DependentService);

    fixture = TestBed
      .configureTestingModule({
        declarations: [SmartComponent],
        providers: [
          {provide: DependentService, useValue: instance(serviceMock)}
        ]
      })
      .overrideTemplate(SmartComponent, '')
      .createComponent(SmartComponent);

    component = fixture.componentInstance;
    spyOn(component['changeDetectorRef'], 'markForCheck');

    fixture.detectChanges();
  });
  // endregion

  it('component should be created', () => {
    expect(component).toBeDefined();
  });

  it('should call service callDoSmthInteresting method', () => {
    verify(serviceMock.callDoSmthInteresting()).once();
  });

  it('should mark component for check', () => {
    expect(component['changeDetectorRef'].markForCheck).toHaveBeenCalled();
  });
});
