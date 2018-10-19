import {Component, OnDestroy} from '@angular/core';
import {AsyncService} from '../services/async.service';
import {DependentService} from '../services/dependent.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-async-service-component',
  template: ''
})
export class AsyncServiceComponent implements OnDestroy {
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

    this.asyncService.emitValue();
  }
}
