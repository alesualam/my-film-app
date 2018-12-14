import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-custom-app';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyBOx54hD21RtiRja-2hec2q3pfv6zx9oHA",
      authDomain: "ng-custom-app.firebaseapp.com",
    });
  }
}
