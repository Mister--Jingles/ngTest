import {Injectable} from '@angular/core';
import {PlainService} from './plain.service';

@Injectable()
export class DependentService {
  constructor(private plainService: PlainService) {
  }

  callDoSmthInteresting() {
    this.plainService.doSmthInteresting();
  }
}
