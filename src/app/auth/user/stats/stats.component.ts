import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { FilmService } from 'src/app/shared/films/films.service';
import { Subscription } from 'rxjs';
import { Film } from 'src/app/shared/films/film.model';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private storage: DataStorageService, private filmService: FilmService, private userService: UserService) { }
  private subscription: Subscription
  current_year = new Date().getFullYear();
  user: User;

  films: Film[];
  stats = {
    'total_films': null,
    'fav_films': null,
    'finished_films': null,
    'towatch_films': null,
    'last_year': null,
    'current_year': null,
    'objective': null,
    'objective_status': null,
  }


  ngOnInit() {
    this.user = this.userService.user;
    console.log(this.user);
    this.storage.getFilms();
    this.subscription = this.filmService.filmsChanged
    .subscribe(
      (films: Film[]) => {
        this.films = films;
        const fav_films = this.films.filter(film => film.fav === true);
        const finished_films = this.films.filter(film => film.status === 'Finished');
        const towatch_films = this.films.filter(film => film.status === 'To-Watch');

        this.stats.total_films = this.films.length;
        this.stats.fav_films = fav_films.length;
        this.stats.finished_films = finished_films.length;
        this.stats.towatch_films = towatch_films.length;

        this.stats.last_year = finished_films.filter(film => film.date.toString().split('-')[0] === (this.current_year - 1).toString()).length;
        this.stats.current_year = finished_films.filter(film => film.date.toString().split('-')[0] === this.current_year.toString()).length;

        this.stats.objective = (this.stats.current_year / this.user.film_objective)*100;
      });
  }

}
