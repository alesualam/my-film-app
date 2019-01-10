import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FilmService } from './films.service';
import { Film } from './film.model';
import { Subscription } from 'rxjs';
import { SimpleSmoothScrollService } from 'ng2-simple-smooth-scroll';
import { DataStorageService } from '../data-storage.service';
import { ImagesService } from '../images.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit, OnDestroy {

  cardContainerSize = 'col-md-12';
  nItems = 12;

  films: Film[];
  p: number = 1;
  private subscription: Subscription;
  private editSub: Subscription;
  @Output() pageChange: EventEmitter<number>;

  constructor(private filmService: FilmService, private smooth: SimpleSmoothScrollService, private storage: DataStorageService,
    private image: ImagesService) { }

  ngOnInit() {

    this.storage.getFilms();
    this.films = this.filmService.getFilms();
    this.subscription = this.filmService.filmsChanged
      .subscribe(
        (films: Film[]) => {
          this.films = films;
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
}