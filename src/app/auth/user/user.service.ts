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
        'birth': new Date(),
        'avatar': ""
    }

    constructor() {}

    getUser() {
        return this.user;
    }
}