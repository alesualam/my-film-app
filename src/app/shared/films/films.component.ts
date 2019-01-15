import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilmService } from './films.service';
import { Film } from './film.model';
import { Subscription } from 'rxjs';
import { SimpleSmoothScrollService } from 'ng2-simple-smooth-scroll';
import { DataStorageService } from '../data-storage.service';
import { ImagesService } from '../images.service';
import { StatsService } from 'src/app/auth/user/stats/stats.service';
import { User } from 'src/app/auth/user/user.model';
import { UserService } from 'src/app/auth/user/user.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit, OnDestroy {

  cardContainerSize = 'col-md-12';
  nItems = 12;
  films: Film[];
  uniqueYears: string[];
  p: number = 1;
  stats = this.statsService.stats;
  user = this.userService.user;

  private subscription: Subscription;
  private userSubscription: Subscription;
  private editSub: Subscription;

  constructor(public filmService: FilmService, private smooth: SimpleSmoothScrollService, private storage: DataStorageService,
    private image: ImagesService, private statsService: StatsService, private userService: UserService) { }

  ngOnInit() {

    this.storage.getFilms();
    this.films = this.filmService.getFilms();
    this.subscription = this.filmService.filmsChanged
      .subscribe(
        (films: Film[]) => {
          this.films = films;
          this.uniqueYears = this.filmService.uniqueYears;

          this.storage.getUser();
          this.userSubscription = this.userService.userSubject.subscribe((user: User) => {
            this.user = user;
            this.statsService.films = this.films;
            this.statsService.user = user;
            this.stats = this.statsService.getStats();
          });
        }
      );

    this.editSub = this.filmService.isEditing.subscribe((value) => {
      if(value) {
        this.cardContainerSize = 'row-md-7';
        this.nItems = 6;
      } else {
        this.cardContainerSize = 'row-md-12';
        this.nItems = 12;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.editSub.unsubscribe();
    this.userSubscription.unsubscribe();
    this.filmService.setFilms([]);
  }

  onEdit(film: Film = null, i: number) {

    this.filmService.isEditing.next(true);
    this.p = Math.ceil((i+1)/6);

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
    this.filmService.deleteFilm(this.filmService.getFilms().indexOf(film));
    this.filmService.editMode = false;
    this.filmService.createMode = false;
  }

  onFilter(filter: string) {
    this.filmService.filterStatus = filter;
    this.filmService.editMode = false;
    this.filmService.createMode = false;
    this.filmService.isEditing.next(false);
  }

  onOrder(method: string) {
    this.filmService.orderStatus = method;
    this.filmService.orderby();
  }

  onYearFilter(year: string) {
    this.filmService.currentYear = year;
  }
}