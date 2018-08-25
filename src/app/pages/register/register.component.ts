import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

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
  public terms;
  public registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AngularFireAuth) {

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

  async signUp() {
    // Control varibles
    const terms = document.getElementById('terms') as HTMLInputElement;
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




    if (validName && validSurname && isItEmail && validUsername && lenghtPassword &&
      lengthUsername && hasNumberPassword && validPassword && upperCasePassword && terms.checked) {
      const email = this.registerForm.value.mail;
      const password = this.registerForm.value.password;

      await this.authService.auth.createUserWithEmailAndPassword(email, password).then(() => {
        firebase.auth().onAuthStateChanged((userData) => {
          if (userData) {
            console.log('USER DATA IS ', userData);

            this.authService.authState.subscribe((activeUser: firebase.User) => {
              console.log('UID IS ', activeUser.uid);
              console.log('ACTIVE USER IS', activeUser);

            });
          }
        });
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

