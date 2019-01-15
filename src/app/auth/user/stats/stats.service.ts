import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { Film } from 'src/app/shared/films/film.model';
import { Subject, Subscription } from 'rxjs';
import { FilmService } from 'src/app/shared/films/films.service';
import { UserService } from '../user.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Injectable()
export class StatsService {

    constructor(private filmsService: FilmService, private userService: UserService, private storage: DataStorageService) {}

    user = this.userService.user;
    statsChanged = new Subject<any>();
    stats = {
        'total_films': null,
        'fav_films': null,
        'finished_films': null,
        'towatch_films': null,
        'last_year': null,
        'current_year': null,
        'objective': 0,
        'objective_status': "danger",
    }
    
    films: Film[] = [];
    current_year = new Date().getFullYear();

    userSubscription: Subscription;
    filmsSubscription: Subscription;

    getStats() {

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

        if(this.stats.objective < 25) {
          this.stats.objective_status = "danger";
        } else if (this.stats.objective > 25 && this.stats.objective < 50) {
          this.stats.objective_status = "warning";
        } else if (this.stats.objective > 50 && this.stats.objective < 75) {
          this.stats.objective_status = "info";
        } else {
          this.stats.objective_status = "success";
        }

        return this.stats;
    }
}