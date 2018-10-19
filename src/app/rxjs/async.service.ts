import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, timer} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Injectable()
export class AsyncService {
  static TIME = 250;
  private subject = new BehaviorSubject(null);

  timer$(): Observable<number> {
    return timer(AsyncService.TIME);
  }

  debounce$(): Observable<void> {
    return this.subject
      .pipe(debounceTime(AsyncService.TIME));
  }
}
