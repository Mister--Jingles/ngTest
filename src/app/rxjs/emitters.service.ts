import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class EmittersService {
  private emitter1 = new Subject<void>();
  private emitter2 = new Subject<void>();

  getEmitter1$() {
    return this.emitter1.asObservable();
  }

  getEmitter2$() {
    return this.emitter2.asObservable();
  }
}
