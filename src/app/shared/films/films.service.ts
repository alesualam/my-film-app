import { Film } from './film.model';
import { Subject } from 'rxjs';

export class FilmService {
    filmsChanged = new Subject<Film[]>();
    startedEditing = new Subject<number>();
    editMode = false;
    createMode = false;
    editedFilmIndex: number;
    currentFilm: Film;
    filterStatus = '';
    scores = Array.from(Array(11).keys()).reverse();
    status_p = [
      'Finished',
      'To-Watch',
    ]

    private films: Film[] = [

    ];

  getFilms() {
    this.orderFilms();

    return this.films.slice();
  }

  addFilm(film: Film) {
    this.films.push(film);
    this.orderFilms();
    this.filmsChanged.next(this.films.slice());
  }

  getFilm(index: number) {
    return this.films[index];
  }

  updateFilm(index: number, newFilm: Film) {
    this.films[index] = newFilm;
    this.orderFilms();
    this.filmsChanged.next(this.films.slice());
  }

  deleteIngredient(index: number) {
    this.films.splice(index, 1);
    this.filmsChanged.next(this.films.slice());
  }

  setFilms(films: Film[]) {
    this.films = films;
    this.filmsChanged.next(this.films.slice());
  }

  orderFilms() { // PROBLEM HERE
    const myfilms = this.films;
    const myfavfilms = myfilms.filter(film => film.fav === true).sort(this.sortbyname);
    const myfinishedfilms = myfilms.filter(film => (film.fav === false && film.status === 'Finished')).sort(this.sortbyname);
    const mytowatchfilms = myfilms.filter(film => film.status === 'To-Watch').sort(this.sortbyname);

    this.films = Array.prototype.concat(myfavfilms, myfinishedfilms, mytowatchfilms);
  }

  sortbyname(a,b) {
    if(a.title > b.title) {
      return 1;
    }
    if(a.title < b.title) {
      return -1;
    }
    return 0;
  }
}
