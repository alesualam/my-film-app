import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { UserService } from './user/user.service';

@Injectable()
export class AuthService {
    loginObservable = new Subject<boolean>();
    logoutObservable = new Subject<boolean>();

    userSubscription: Subscription;

    createdAccountSuccess = false;
    loginSuccess = false;
    logoutSuccess = false;
    signupError = false;
    signinError = false;
    errorType = '';
    token: string;

    constructor(private router: Router, private userService: UserService) {}

    signupUser(email: string, password: string) {
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password).then(
            response => {
                this.signupError = false;
                this.createdAccountSuccess = true;
            }
        ).catch(
            error => {
                this.signupError = true;
                this.errorType = error.code;
            }
        );
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password).then(
            response => {
                this.signinError = false;
                this.loginSuccess = true;
                this.loginObservable.next(this.loginSuccess);
                this.logoutSuccess = false;

                this.router.navigate(['/']);
                firebase.auth().currentUser.getIdToken().then(
                    (token: string) => this.token = token
                );
            }
        ).catch(
            error => {
                this.signinError = true;
                this.errorType = error.code;
            }
        );
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
        this.loginSuccess = false;
        this.logoutSuccess = true;
        this.logoutObservable.next(this.logoutSuccess);
        this.router.navigate(['/']);
    }

    getToken() {
        firebase.auth().currentUser.getIdToken().then(
            (token: string) => this.token = token
        );
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    getUid() {
        return firebase.auth().currentUser.uid;
    }
}