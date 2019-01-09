import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { passwordEquals } from './signup-valid.directive';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'rpassword': new FormControl(null, [Validators.required])
    }, {validators: passwordEquals});
  }

  onSignup(form: NgForm) {
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    this.authService.signupUser(email, password);
    this.signupForm.reset();
  }

  onCancel() {
    this.authService.signinError = false;
  }
}
