import {Component, OnDestroy} from '@angular/core';
import {AsyncService} from './async.service';
import {DependentService} from '../services/dependent.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-async-component',
  template: ''
})
export class AsyncComponent implements OnDestroy {
  private destroy$ = new Subject();

  constructor(private asyncService: AsyncService,
              private service: DependentService) {
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  callTimer() {
    this.asyncService.timer$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.service.callDoSmthInteresting());
  }

  callDebounce() {
    this.asyncService.debounce$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.service.callDoSmthInteresting());
  }
}
