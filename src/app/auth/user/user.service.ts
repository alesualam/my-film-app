import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject } from 'rxjs';

@Injectable()
export class UserService {
    
    userSubject = new Subject<User>();
    startedEditing = new Subject<boolean>();
    editMode = false;
    user: User = {
        'username': "",
        'bio': "",
        'birth': null,
        'avatar': "",
        'film_objective': null,
    }

    constructor() {}

    getUser() {
        return this.user;
    }
}