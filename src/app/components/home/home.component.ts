import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {

  constructor() {
    firebase.database().ref().child('test').on('value', data => {
      console.log(data.val());
    });
  }

  ngOnInit() {
  }

}

