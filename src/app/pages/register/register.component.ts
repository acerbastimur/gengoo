import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
  constructor(private fb: FormBuilder) {

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

  passwordEquation(): boolean {
    console.log('entered');
    
    if(this.password === this.confirmPassword) {
      console.log('true');

      return true;
    } else {
      console.log('false');

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
    console.log(char);

    if (control.value.match(char)) {


      flag = false;
      console.log(control);
      return { upperCase: true };
    }
  }
  console.log(control);

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
  console.log(control);

  const isValid = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(control.value);
  if (control.value.length > 0 && !isValid) {
    return { isEmail: false };
  } else { return { isEmail: true }; }
}

// Check all the flags if whether they are usable

function canRegister(form: FormControl): { [s: string]: boolean } {
  let flag = false;
  console.log(form);

  let flag1, flag2, flag3, flag4, flag5, flag6;

  if (true) {
    flag = true;
  }
  return { flag };
}
