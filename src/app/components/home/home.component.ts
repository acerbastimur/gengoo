import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as firebase from 'firebase/app';

import {Power1, Bounce} from 'gsap/all';

declare var TweenMax: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  @ViewChild('mushroom') box: ElementRef;

  constructor() {
    firebase.database().ref().child('test').on('value', data => {
      console.log(data.val());
    });
  }

  ngOnInit() {
    this.doIt();

  }
  doIt(): void {

    TweenMax.fromTo(this.box.nativeElement, 2, {x: 20}, {x: 440, ease: Power1.easeOut});
    TweenMax.fromTo(this.box.nativeElement, 2, {y: 20}, {y: 440, ease: Bounce.easeOut});
  }
}

