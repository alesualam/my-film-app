import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { fadeOutOnLeaveAnimation } from 'angular-animations';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fadeOutOnLeaveAnimation()
  ]
})
export class HomeComponent implements OnInit {

  loginMessage = this.authService.loginSuccess;

  constructor(private authService: AuthService, private storage: DataStorageService) {
    setTimeout(() => {
      this.loginMessage = false;
    }, 2000);
  }

  ngOnInit() {
    
  }


  // MEMORY LEAK, TODO

  // onLogin() {
  //   if(this.authService.loginSuccess) {
  //       setTimeout(() => {
  //         this.loginMessage = false;
  //       }, 1500);
  //       return this.loginMessage;
  //   }
  // }

  // onLogout() {
  //   if(this.authService.logoutSuccess) {
  //     setTimeout(() => {
  //       this.logoutMessage = false;
  //     }, 1500);
  //     return this.logoutMessage;
  //   }
  // }

}