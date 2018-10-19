import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DependentService} from '../services/dependent.service';

@Component({
  selector: 'app-smart-component',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartComponent implements OnInit {
  constructor(private service: DependentService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.service.callDoSmthInteresting();
    this.changeDetectorRef.markForCheck();
  }
}
