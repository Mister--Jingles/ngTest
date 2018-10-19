import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-dumb-component',
  template: `<span (click)="emitMessage()">{{name}}</span>`
})
export class DumbComponent {
  @Input() name: string;
  @Output() message = new EventEmitter<void>();

  emitMessage() {
    this.message.emit();
  }
}
