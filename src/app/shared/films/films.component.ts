import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilmService } from './films.service';
import { Film } from './film.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit, OnDestroy {

  films: Film[];
  private subscription: Subscription;

  constructor(private filmService: FilmService) { }

  ngOnInit() {
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

  onEdit(index: number) {
    this.filmService.editMode = true;
    this.filmService.editedFilmIndex = index;
    console.log(index);
  }
}
