import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { fadeOutOnLeaveAnimation } from 'angular-animations';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ImagesService } from 'src/app/shared/images.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fadeOutOnLeaveAnimation()
  ]
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private storage: DataStorageService, private image: ImagesService) {}

  ngOnInit() {
  }

}