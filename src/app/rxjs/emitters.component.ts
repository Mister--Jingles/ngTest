import {Component, OnDestroy} from '@angular/core';
import {DependentService} from '../services/dependent.service';
import {combineLatest, of, Subject} from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators';
import {EmittersService} from './emitters.service';

@Component({
  selector: 'app-emitters-component',
  template: ''
})
export class EmittersComponent implements OnDestroy {
  private destroy$ = new Subject();

  constructor(private emittersService: EmittersService,
              private service: DependentService) {
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  subscribeToEmitter() {
    of(null)
      .pipe(
        switchMap(() => this.emittersService.getEmitter1$()),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.service.callDoSmthInteresting());
  }

  subscribeToMultipleEmitters() {
    const emitter1 = this.emittersService.getEmitter1$();
    const emitter2 = this.emittersService.getEmitter2$();

    of(null)
      .pipe(
        switchMap(() => combineLatest(emitter1, emitter2)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.service.callDoSmthInteresting());
  }
}
