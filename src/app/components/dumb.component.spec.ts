import {DumbComponent} from './dumb.component';
import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';

describe(`${DumbComponent.name} | Test @Input and @Output:`, () => {
  // region TestSetup
  const DEFAULT_NAME = 'name';

  @Component({
    selector: 'app-test',
    template: `
      <app-dumb-component [name]="name"
                          (message)="onMessage()"></app-dumb-component>
    `
  })
  class TestComponent {
    @ViewChild(DumbComponent) component: DumbComponent;

    name = DEFAULT_NAME;

    onMessage() {
    }
  }

  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let component: DumbComponent;

  beforeEach(() => {
    fixture = TestBed
      .configureTestingModule({
        declarations: [
          TestComponent,
          DumbComponent
        ]
      })
      .overrideTemplate(DumbComponent, '')
      .createComponent(TestComponent);

    testComponent = fixture.componentInstance;
    component = testComponent.component;

    fixture.detectChanges();
  });
  // endregion

  it('component should be created', () => {
    expect(component).toBeDefined();
  });

  it(`name should be ${DEFAULT_NAME}`, () => {
    expect(component.name).toBe(DEFAULT_NAME);
  });

  it('component should emit message event', () => {
    spyOn(component.message, 'emit');
    component.emitMessage();

    expect(component.message.emit).toHaveBeenCalled();
  });
});
