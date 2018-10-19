import {Component, OnInit} from '@angular/core';
import {DependentService} from '../services/dependent.service';

@Component({
  selector: 'app-own-service-component',
  template: '',
  providers: [DependentService]
})
export class OwnServiceComponent implements OnInit {
  constructor(private service: DependentService) {
  }

  ngOnInit() {
    this.service.callDoSmthInteresting();
  }
}
