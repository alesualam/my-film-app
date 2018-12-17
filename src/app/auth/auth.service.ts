import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    createdAccountSuccess = false;
    loginSuccess = false;
    logoutSuccess = false;
    signupError = false;
    signinError = false;
    errorType = '';
    token: string;

    constructor(private router: Router) {}

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
}