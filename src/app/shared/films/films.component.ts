import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilmService } from './films.service';
import { Film } from './film.model';
import { Subscription } from 'rxjs';
import { SimpleSmoothScrollService } from 'ng2-simple-smooth-scroll';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit, OnDestroy {

  films: Film[];
  private subscription: Subscription;

  constructor(private filmService: FilmService, private smooth: SimpleSmoothScrollService, private storage: DataStorageService) { }

  ngOnInit() {
    this.storage.getFilms();
    this.films = this.filmService.getFilms();
    this.subscription = this.filmService.filmsChanged
      .subscribe(
        (films: Film[]) => {
          this.films = films;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEdit(film: Film = null) {
    if (film !== null) {
      this.filmService.editMode = true;
      this.filmService.createMode = false;
      this.filmService.editedFilmIndex = this.filmService.getFilms().indexOf(film);
      this.filmService.startedEditing.next(this.filmService.getFilms().indexOf(film));
    }
    else {
      this.filmService.createMode = true;
      this.filmService.editMode = false;
    }
  }

  onDelete(film: Film) {
    this.filmService.deleteIngredient(this.filmService.getFilms().indexOf(film));
    this.filmService.editMode = false;
    this.filmService.createMode = false;
  }

  onFilter(filter: string) {
    this.filmService.filterStatus = filter;
    this.filmService.editMode = false;
    this.filmService.createMode = false;
  }
}
