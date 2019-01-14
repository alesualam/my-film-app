import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { FilmService } from 'src/app/shared/films/films.service';
import { Subscription } from 'rxjs';
import { Film } from 'src/app/shared/films/film.model';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { StatsService } from './stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private storage: DataStorageService, private filmService: FilmService, private userService: UserService,
    private statsService: StatsService) { }
  private subscription: Subscription

  user: User;
  stats = this.statsService.stats;

  films: Film[];

  ngOnInit() {
    this.statsService.user = this.userService.user;
    this.storage.getFilms();
    this.subscription = this.filmService.filmsChanged
    .subscribe(
      (films: Film[]) => {
        this.statsService.films = films;
        this.stats = this.statsService.getStats();
      });
  }

}
