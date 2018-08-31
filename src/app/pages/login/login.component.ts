import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AngularFireAuth,
    private router: Router) {

  }

  ngOnInit() {
  }

  async login() {
    console.log(this.user.email, this.user.password);
    if (this.user.email !== '' && this.user.password !== '') {
      await this.authService.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then((thatUser) => {
        console.log(thatUser);

      })
      .then(() => {
        this.router.navigate(['/choose-video']);

      })
      .catch(error => {
        console.log(error);

      });
    }

  }
}
