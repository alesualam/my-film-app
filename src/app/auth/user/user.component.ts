import { Component, OnInit } from '@angular/core';

import { User } from './user.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { UserService } from './user.service';
import { Subscription, Subject } from 'rxjs';
import { HttpEvent } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private storage: DataStorageService, private userService: UserService) { }
  user: User;
  userForm: FormGroup;
  private userSubscription: Subscription;

  ngOnInit() {
    this.user = this.userService.user;
    this.storage.getUser();
    this.userSubscription = this.userService.userSubject.subscribe((user: User) => {
      this.user = user;
      this.userService.user = user;
    });

    this.userForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'bio': new FormControl(null),
      'birth': new FormControl(null),
      'avatar': new FormControl(null),
    });

    this.userService.startedEditing.subscribe((value) => {
      this.userForm.patchValue({
        'username': this.user.username,
        'bio': this.user.bio,
        'birth': this.user.birth,
        'avatar': this.user.avatar,
      });
    });
  }

  onEdit() {
    this.userService.editMode = true;
    this.userService.startedEditing.next(true);
  }

  onSubmit() {
    const userValues = this.userForm.value;
    const userData = new User(userValues.username, userValues.bio, userValues.birth, userValues.avatar, this.user.film_objective);

    this.user = userData;
    this.userService.user = userData;

    this.storage.saveUser().subscribe(
      (response: HttpEvent<Object>) => {
        this.userService.editMode = false;
        // this.storage.saveSuccess = true;
        // this.storage.saveObservable.next(this.storage.saveSuccess);
      }
    );
  }

  onCancel() {
    this.userService.editMode = false;
    this.userService.startedEditing.next(false);
  }

}
