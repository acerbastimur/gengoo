import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

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
  spinner_show = false;

  constructor(
    private authService: AngularFireAuth,
    private router: Router) {

  }

  ngOnInit() {
  }

  async login() {
    console.log(this.user.email, this.user.password);
    if (this.user.email !== '' && this.user.password !== '') {
      this.spinner_show = true;

      await this.authService.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then((thatUser) => {
        console.log(thatUser);
        this.spinner_show = false;

      })
        .then(() => {
          this.router.navigate(['/choose-video']);

        })
        .catch(error => {
          console.log(error);
          $(function () {

            $('#popup1').css("visibility", "visible");
            $('#popup1').css("opacity", 1);

          });

          $(".close").click(function () {

            $('#popup1').css("visibility", "hidden");
            $('#popup1').css("opacity", 0);
          });
          this.spinner_show = false;

        });
    } else {
      $(function () {

        $('#popup1').css("visibility", "visible");
        $('#popup1').css("opacity", 1);

      });

      $(".close").click(function () {

        $('#popup1').css("visibility", "hidden");
        $('#popup1').css("opacity", 0);
      });
    }

  }
}
