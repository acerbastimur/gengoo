import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  addressEmail: string;
  constructor() { }

  ngOnInit() {
  }

  sendResetPassword() {
    const auth = firebase.auth();
    auth.sendPasswordResetEmail(this.addressEmail).then(function () {
      console.log('email has been sent to your email address')
    })
      .catch(function (error) {
        // An error happened.
        console.log(error);
        
      });
  }
}
