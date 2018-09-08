import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import * as $ from 'jquery';
declare var TweenMax: any;
import { TweenMax, TweenLite, RoughEase, Linear, Power2 } from 'gsap/TweenMax';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public name: string;
  public surname: string;
  public mail: string;
  public username: string;
  public confirmPassword: string;
  public password: string;
  public registerForm: FormGroup;
  spinner_show = false;
  constructor(
    private fb: FormBuilder,
    private authService: AngularFireAuth,
    private router: Router) {

    this.registerForm = fb.group({
      'name': ['', Validators.compose([isValid])],
      'surname': ['', Validators.compose([isValid])],
      'mail': ['', Validators.compose([
        isValid,
        isEmail
      ])],
      'username': ['', Validators.compose([
        isValid,
        minLength
      ])],
      'password': ['', Validators.compose([
        hasUpperCase,
        isValid,
        minLength,
        hasNumber,
      ])],
      'confirmPassword': ['', Validators.compose([isValid])],
    });
  }

  ngOnInit() {
    }

  errorName() {
    if(this.registerForm.controls.name.errors.isValid == false) {
      TweenMax.to('.formName', 0.2, {css: {border: '2px solid rgb(255, 111, 111)'}})
      TweenLite.fromTo('.formName', 0.3, {x: -2},
      {x: 2, ease: RoughEase.ease.config({strength: 8, points: 5, template: Linear.easeNone, randomize: false}), clearProps: 'x'});
      TweenMax.to('.errorName', 0.8, {css: {marginLeft: '-280', opacity: '1'}, ease: Power2.ease});
      $('.errorName').css({'display':'block'})
    } else {
      TweenMax.to('.formName', 0.2, {css: {border: '2px solid rgb(102, 236, 153)'}})
      TweenMax.to('.errorName', 0.8, {css: {marginLeft: '-210', opacity: '0'}, ease: Power2.ease, 
      onComplete:function(){
        $('.errorName').css({'display':'none'})
      }});
    }
  }
  errorPassCheck() {
   if(this.passwordEquation() == true) {
      TweenMax.to('.formPassCheck', 0.2, {css: {border: '2px solid rgb(255, 111, 111)'}})
      TweenLite.fromTo('.formPassCheck', 0.3, {x: -2},
      {x: 2, ease: RoughEase.ease.config({strength: 8, points: 5, template: Linear.easeNone, randomize: false}), clearProps: 'x'});
      TweenMax.to('.errorCheckPass', 0.8, {css: {marginLeft: '420', opacity: '1'}, ease: Power2.ease});
      $('.errorCheckPass').css({'display':'block'})
   } else {
      TweenMax.to('.formPassCheck', 0.2, {css: {border: '2px solid rgb(102, 236, 153)'}})
      TweenMax.to('.errorCheckPass', 0.8, {css: {marginLeft: '350', opacity: '0'}, ease: Power2.ease, 
      onComplete:function(){
        $('.errorCheckPass').css({'display':'none'})
      }});
   }
  }
  errorSName() {
    if(this.registerForm.controls.surname.errors.isValid == false) {
      TweenMax.to('.formSName', 0.2, {css: {border: '2px solid rgb(255, 111, 111)'}})
      TweenLite.fromTo('.formSName', 0.3, {x: -2},
      {x: 2, ease: RoughEase.ease.config({strength: 8, points: 5, template: Linear.easeNone, randomize: false}), clearProps: 'x'});
      TweenMax.to('.errorSName', 0.8, {css: {marginLeft: '420', opacity: '1'}, ease: Power2.ease});
      $('.errorSName').css({'display':'block'})
    } else {
      TweenMax.to('.formSName', 0.2, {css: {border: '2px solid rgb(102, 236, 153)'}})
      TweenMax.to('.errorSName', 0.8, {css: {marginLeft: '350', opacity: '0'}, ease: Power2.ease, 
      onComplete:function(){
        $('.errorSName').css({'display':'none'})
      }});
    }
  }
  errorMail() {
    if(this.registerForm.controls.mail.errors.isValid == false) {
      TweenMax.to('.formMail', 0.2, {css: {border: '2px solid rgb(255, 111, 111)'}})
      TweenLite.fromTo('.formMail', 0.3, {x: -2},
      {x: 2, ease: RoughEase.ease.config({strength: 8, points: 5, template: Linear.easeNone, randomize: false}), clearProps: 'x'});
      TweenMax.to('.errorEmailReq', 0.8, {css: {marginLeft: '-280', opacity: '1'}, ease: Power2.ease});
      $('.errorEmailReq').css({'display':'block'})
    } else {
      TweenMax.to('.formMail', 0.2, {css: {border: '2px solid rgb(102, 236, 153)'}})
      TweenMax.to('.errorEmailReq', 0.8, {css: {marginLeft: '-210', opacity: '0'}, ease: Power2.ease, 
      onComplete:function(){
        $('.errorEmailReq').css({'display':'none'})
      }});    }
    if(this.registerForm.controls.mail.errors.isEmail == false) {
      TweenMax.to('.formMail', 0.2, {css: {border: '2px solid rgb(255, 111, 111)'}})
      TweenLite.fromTo('.formMail', 0.3, {x: -2},
      {x: 2, ease: RoughEase.ease.config({strength: 8, points: 5, template: Linear.easeNone, randomize: false}), clearProps: 'x'});
      TweenMax.to('.errorEmailVal', 0.8, {css: {marginLeft: '-280', opacity: '1'}, ease: Power2.ease});
      $('.errorEmailVal').css({'display':'block'})
    } else {
      TweenMax.to('.formMail', 0.2, {css: {border: '2px solid rgb(102, 236, 153)'}})
      TweenMax.to('.errorEmailVal', 0.8, {css: {marginLeft: '-210', opacity: '0'}, ease: Power2.ease, 
      onComplete:function(){
        $('.errorEmailVal').css({'display':'none'})
      }});    }
  }
  errorUName() {
    if(this.registerForm.controls.username.errors.isValid == false) {
      TweenMax.to('.formUName', 0.2, {css: {border: '2px solid rgb(255, 111, 111)'}})
      TweenLite.fromTo('.formUName', 0.3, {x: -2},
      {x: 2, ease: RoughEase.ease.config({strength: 8, points: 5, template: Linear.easeNone, randomize: false}), clearProps: 'x'});
      TweenMax.to('.errorUserReq', 0.8, {css: {marginLeft: '420', opacity: '1'}, ease: Power2.ease});
      $('.errorUserReq').css({'display':'block'})
    } else {
      TweenMax.to('.formUName', 0.2, {css: {border: '2px solid rgb(102, 236, 153)'}})
      TweenMax.to('.errorUserReq', 0.8, {css: {marginLeft: '350', opacity: '0'}, ease: Power2.ease, 
      onComplete:function(){
        $('.errorUserReq').css({'display':'none'})
      }});    }
    if(this.registerForm.controls.username.errors.minLength == false) {
      TweenMax.to('.formUName', 0.2, {css: {border: '2px solid rgb(255, 111, 111)'}})
      TweenLite.fromTo('.formUName', 0.3, {x: -2},
      {x: 2, ease: RoughEase.ease.config({strength: 8, points: 5, template: Linear.easeNone, randomize: false}), clearProps: 'x'});
      TweenMax.to('.errorUserLeast', 0.8, {css: {marginLeft: '420', opacity: '1'}, ease: Power2.ease});
      $('.errorUserLeast').css({'display':'block'})
    } else {
      TweenMax.to('.formUName', 0.2, {css: {border: '2px solid rgb(102, 236, 153)'}})
      TweenMax.to('.errorUserLeast', 0.8, {css: {marginLeft: '350', opacity: '0'}, ease: Power2.ease, 
      onComplete:function(){
        $('.errorUserLeast').css({'display':'none'})
      }});    
    }
  }
  errorPassword() {
    if(this.registerForm.controls.password.errors.isValid == false) {
      TweenMax.to('.formPassword', 0.2, {css: {border: '2px solid rgb(255, 111, 111)'}})
      TweenLite.fromTo('.formPassword', 0.3, {x: -2},
      {x: 2, ease: RoughEase.ease.config({strength: 8, points: 5, template: Linear.easeNone, randomize: false}), clearProps: 'x'});
      TweenMax.to('.errorPassReq', 0.8, {css: {marginLeft: '-280', opacity: '1'}, ease: Power2.ease});
      $('.errorPassReq').css({'display':'block'})
    } else {
      TweenMax.to('.formPassword', 0.2, {css: {border: '2px solid rgb(102, 236, 153)'}})
      TweenMax.to('.errorPassReq', 0.8, {css: {marginLeft: '-210', opacity: '0'}, ease: Power2.ease, 
      onComplete:function(){
        $('.errorPassReq').css({'display':'none'})
      }});    
    }
    if(this.registerForm.controls.password.errors.minLength == false) {
      TweenMax.to('.formPassword', 0.2, {css: {border: '2px solid rgb(255, 111, 111)'}})
      TweenLite.fromTo('.formPassword', 0.3, {x: -2},
      {x: 2, ease: RoughEase.ease.config({strength: 8, points: 5, template: Linear.easeNone, randomize: false}), clearProps: 'x'});
      TweenMax.to('.errorPassLeast', 0.8, {css: {marginLeft: '-280', opacity: '1'}, ease: Power2.ease});
      $('.errorPassLeast').css({'display':'block'})
    } else {
      TweenMax.to('.formPassword', 0.2, {css: {border: '2px solid rgb(102, 236, 153)'}})
      TweenMax.to('.errorPassLeast', 0.8, {css: {marginLeft: '-210', opacity: '0'}, ease: Power2.ease, 
      onComplete:function(){
        $('.errorPassLeast').css({'display':'none'})
      }});    
    }
    if(this.registerForm.controls.password.errors.hasUpperCase == false) {      
      TweenMax.to('.formPassword', 0.2, {css: {border: '2px solid rgb(255, 111, 111)'}})
      TweenLite.fromTo('.formPassword', 0.3, {x: -2},
      {x: 2, ease: RoughEase.ease.config({strength: 8, points: 5, template: Linear.easeNone, randomize: false}), clearProps: 'x'});
      TweenMax.to('.errorPassUpper', 0.8, {css: {marginLeft: '-280', opacity: '1'}, ease: Power2.ease});
      $('.errorPassUpper').css({'display':'block'})
    } else {
      TweenMax.to('.formPassword', 0.2, {css: {border: '2px solid rgb(102, 236, 153)'}})
      TweenMax.to('.errorPassUpper', 0.8, {css: {marginLeft: '-210', opacity: '0'}, ease: Power2.ease, 
      onComplete:function(){
        $('.errorPassUpper').css({'display':'none'})
      }});    
    }
    if(this.registerForm.controls.password.errors.hasNumber == false) {
      TweenMax.to('.formPassword', 0.2, {css: {border: '2px solid rgb(255, 111, 111)'}})
      TweenLite.fromTo('.formPassword', 0.3, {x: -2},
      {x: 2, ease: RoughEase.ease.config({strength: 8, points: 5, template: Linear.easeNone, randomize: false}), clearProps: 'x'});
      TweenMax.to('.errorPassNum', 0.8, {css: {marginLeft: '-280', opacity: '1'}, ease: Power2.ease});
      $('.errorPassNum').css({'display':'block'})
    } else {
      TweenMax.to('.formPassword', 0.2, {css: {border: '2px solid rgb(102, 236, 153)'}})
      TweenMax.to('.errorPassNum', 0.8, {css: {marginLeft: '-210', opacity: '0'}, ease: Power2.ease, 
      onComplete:function(){
        $('.errorPassNum').css({'display':'none'})
      }});    
    }
  }

  async signUp() {
    // Control varibles
    const inputValues = this.registerForm;
    const validName = inputValues.controls.name.errors.isValid;
    const validSurname = inputValues.controls.surname.errors.isValid;
    const isItEmail = inputValues.controls.mail.errors.isEmail;
    const validUsername = inputValues.controls.username.errors.isValid;
    const lengthUsername = inputValues.controls.username.errors.minLength;
    const hasNumberPassword = inputValues.controls.password.errors.hasNumber;
    const validPassword = inputValues.controls.password.errors.isValid;
    const lenghtPassword = inputValues.controls.password.errors.minLength;
    const upperCasePassword = inputValues.controls.password.errors.upperCase;

    const userDetails = {
      name: this.name,
      surname: this.surname,
      username: this.username,
      mail: this.mail,
      registerDate: Date.now()

    };

    if (validName && validSurname && isItEmail && validUsername && lenghtPassword &&
      lengthUsername && hasNumberPassword && validPassword && upperCasePassword) {
      const email = this.registerForm.value.mail;
      const password = this.registerForm.value.password;
        this.spinner_show = true;
      await this.authService.auth.createUserWithEmailAndPassword(email, password).then(() => {
        firebase.auth().onAuthStateChanged((userData) => {
          if (userData) {
            console.log('USER DATA IS ', userData);

            this.authService.authState.subscribe((activeUser: firebase.User) => {
              firebase.database().ref('/users/' + activeUser.uid + '/personelDetails').update(userDetails)
                .then(() => {
                  this.spinner_show = false;

                  this.router.navigate(['/enterance']);

                });

            });
          }
        });
      }).catch(error => {
        console.log('THERE IS AN ERROR : ', error);
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



  // Check if password and confirm password are equal
  passwordEquation(): boolean {

    if (this.password === this.confirmPassword && this.confirmPassword !== '') {

      return true;
    } else {

      return false;
    }
  }


}

// Check if input is more than 6 characters
function minLength(control: FormControl): { [s: string]: boolean } {
  if (control.value.length > 5) {
    return { minLength: true };
  } else { return { minLength: false }; }
}


// Check if there is a text in input
function isValid(control: FormControl): { [s: string]: boolean } {
  if (control.value.length > 0) {
    return { isValid: true };
  } else { return { isValid: false }; }
}
// Check  if password has a uppercase in it.
function hasUpperCase(control: FormControl): { [s: string]: boolean } {
  const uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'I', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  let flag = true;
  for (const char of uppercase) {

    if (control.value.match(char)) {
      flag = false;
      return { upperCase: true };
    }
  }
  if (flag) {
    return { upperCase: false };
  }

}

// Check  if password has a number in it.
function hasNumber(control: FormControl): { [s: string]: boolean } {
  let flag = true;
  for (let i = 0; i <= 9; i++) {
    if (control.value.match(i)) {
      flag = false;
      break;
    }
  }
  if (flag) {
    return { hasNumber: false };
  } else {
    return { hasNumber: true };
  }
}

// Check if it is a valid email
function isEmail(control: FormControl): { [s: string]: boolean } {
  const isValid = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(control.value);
  if (!isValid) {
    return { isEmail: false };
  } else { return { isEmail: true }; }
}

