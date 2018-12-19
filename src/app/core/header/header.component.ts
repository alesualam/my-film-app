import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { HttpEvent } from '@angular/common/http';
import { FilmService } from 'src/app/shared/films/films.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  dropStatus = false;
  expandStatus = false;

  saveObservable = new Subject<boolean>();
  saveSuccess = false;

  constructor(private authService: AuthService, private storage: DataStorageService, private filmService: FilmService) { }

  ngOnInit() {
  }

  onDropdown() {
   this.dropStatus = !this.dropStatus;
  }

  onExpand() {
    this.expandStatus = !this.expandStatus;
  }

  userAuthenticated() {
    return this.authService.isAuthenticated();
  }

  onLogout() {
    let exit = true;
    if (this.filmService.unsavedData) {
      exit = confirm("There is unsaved data. All changes will be lost.");
    }
    if (exit) {
      this.authService.logout();
      this.filmService.editMode = false;
      this.filmService.createMode = false;
    }
  }

  onFetch() {
    let undo = true;
    if (this.filmService.unsavedData) {
      undo = confirm("Are you sure?");
    }
    if (undo) {
      this.storage.getFilms();
    }
  }

  onSave() {
    this.storage.storeFilms().subscribe(
      (response: HttpEvent<Object>) => {
        this.filmService.unsavedData = false;
        this.storage.saveSuccess = true;
        this.storage.saveObservable.next(this.storage.saveSuccess);
        console.log(response);
      }
    );
  }
}
