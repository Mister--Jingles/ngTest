import {Injectable} from '@angular/core';
import {Observable, of, Subject, timer} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Injectable()
export class AsyncService {
  static TIME = 250;
  private subject = new Subject<void>();

  emitValue() {
    this.subject.next();
  }

  timer$(): Observable<number> {
    return timer(AsyncService.TIME);
  }

  debounce$(): Observable<void> {
    return this.subject
      .pipe(debounceTime(AsyncService.TIME));
  }
}
