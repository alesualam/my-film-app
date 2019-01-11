import { Film } from './film.model';
import { Subject } from 'rxjs';

// TODO - Nuevas formas de ordenación
export class FilmService {

  filmsChanged = new Subject<Film[]>();
  startedEditing = new Subject<number>();
  isEditing = new Subject<boolean>();
  editMode = false;
  createMode = false;
  editedFilmIndex: number;
  currentFilm: Film;

  filterStatus = '';
  orderStatus = '';
  uniqueYears = [];
  currentYear = '';

  unsavedData = false;
  scores = Array.from(Array(11).keys()).reverse();
  status_p = [
    'Finished',
    'To-Watch',
  ]

  private films: Film[] = [];

  getFilms() {
    this.orderby();
    return this.films.slice();
  }

  addFilm(film: Film) {
    this.films.push(film);
    this.unsavedData = true;
    this.orderby();
    this.filmsChanged.next(this.films.slice());
  }

  getFilm(index: number) {
    return this.films[index];
  }

  updateFilm(index: number, newFilm: Film) {
    this.films[index] = newFilm;
    this.unsavedData = true;
    this.orderby();
    this.filmsChanged.next(this.films.slice());
  }

  deleteFilm(index: number) {
    this.films.splice(index, 1);
    this.unsavedData = true;
    this.filmsChanged.next(this.films.slice());
  }

  setFilms(films: Film[]) {
    this.films = films;

    let yearsCollection = films.map(a => a.date).filter((el) => {
      return el !== undefined;
    }).map(b => b.toString().split('-')[0]);

    this.uniqueYears = Array.from(new Set(yearsCollection)).sort().reverse();

    this.filmsChanged.next(this.films.slice());
  }

  orderby() {
    if(this.orderStatus === 'title') {
      this.films = this.films.sort(this.sortbyname);
    } else if (this.orderStatus === 'date') {
      this.films = this.films.sort(this.sortbydate);
    } else {
      const myfilms = this.films;
      const myfavfilms = myfilms.filter(film => film.fav === true).sort(this.sortbyname);
      const myfinishedfilms = myfilms.filter(film => (film.fav === false && film.status === 'Finished')).sort(this.sortbyname);
      const mytowatchfilms = myfilms.filter(film => film.status === 'To-Watch').sort(this.sortbyname);
  
      this.films = Array.prototype.concat(myfavfilms, myfinishedfilms, mytowatchfilms);
    }
    this.filmsChanged.next(this.films.slice());
  }

  sortbyname(a, b) {
    if(a.title > b.title) {
      return 1;
    }
    if(a.title < b.title) {
      return -1;
    }
    return 0;
  }

  sortbydate(a, b) {
    if(a.date > b.date) {
      return 1;
    }
    if(a.date < b.date) {
      return -1;
    }
    return 0;
  }
}
