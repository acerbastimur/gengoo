import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import * as $ from 'jquery';
import TweenMax from 'gsap/TweenMax';
import Draggable from 'gsap/Draggable';
declare var TweenMax: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public electronService: ElectronService,
    private translate: TranslateService) {

    translate.setDefaultLang('en');
    if (electronService.isElectron()) {
    } else {
     }
  }

  exit () {
    this.electronService.exit();
  }
  minimize () {
    this.electronService.minimize();
  }
  maximize() {
    this.electronService.maximize();
  }
}
