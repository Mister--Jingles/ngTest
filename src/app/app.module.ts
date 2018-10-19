import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {DumbComponent} from './components/dumb.component';
import {OwnServiceComponent} from './components/own-service.component';
import {SmartComponent} from './components/smart.coponent';
import {AsyncComponent} from './rxjs/async.component';
import {EmittersComponent} from './rxjs/emitters.component';
import {PlainService} from './services/plain.service';
import {DependentService} from './services/dependent.service';
import {AsyncService} from './rxjs/async.service';
import {EmittersService} from './rxjs/emitters.service';
import {LocalStorageService} from './services/localStorage.service';

@NgModule({
  imports: [
    BrowserModule
  ],
  providers: [
    PlainService,
    DependentService,
    AsyncService,
    EmittersService,
    LocalStorageService
  ],
  declarations: [
    AppComponent,
    DumbComponent,
    OwnServiceComponent,
    SmartComponent,
    AsyncComponent,
    EmittersComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
