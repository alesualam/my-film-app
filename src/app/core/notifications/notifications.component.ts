import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Subscription } from 'rxjs';
import { fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  animations: [
    fadeOutOnLeaveAnimation()
  ]
})
export class NotificationsComponent implements OnInit, OnDestroy {

  private loginSubscription: Subscription;
  private logoutSubscription: Subscription;
  private saveSubscription: Subscription;

  loginMessage = false;
  logoutMessage = false;
  saveMessage = false;

  constructor(private authService: AuthService, private storage: DataStorageService) { 
    this.loginSubscription = this.authService.loginObservable.subscribe(value => {
      this.loginMessage = this.authService.loginSuccess;

      setTimeout(()=>{
        this.loginMessage = false;
      }, 1500);

    });

    this.logoutSubscription = this.authService.logoutObservable.subscribe(value => {
      this.logoutMessage = this.authService.logoutSuccess;

      setTimeout(()=>{
        this.logoutMessage = false;
      }, 1500);
    });

    this.saveSubscription = this.storage.saveObservable.subscribe(value => {
      this.saveMessage = this.storage.saveSuccess;

      setTimeout(()=>{
        this.saveMessage = false;
      }, 1500);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
    this.logoutSubscription.unsubscribe();
  }

}
