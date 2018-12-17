import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fadeOutOnLeaveAnimation()
  ]
})
export class HomeComponent implements OnInit {

  loginMessage = true;
  logoutMessage = true;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin() {
    if(this.authService.loginSuccess) {
        setTimeout(() => {
          this.loginMessage = false;
        }, 1500);
        return this.loginMessage;
    }
  }

  onLogout() {
    if(this.authService.logoutSuccess) {
      setTimeout(() => {
        this.logoutMessage = false;
      }, 1500);
      return this.logoutMessage;
    }
  }
}