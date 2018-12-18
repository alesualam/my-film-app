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
    scores = Array.from(Array(11).keys());
    status_p = [
      'Finished',
      'To-Watch',
    ]

    private films: Film[] = [
      new Film('Title 1', 'Description 1', 'Finished', new Date(), 10, true),
      new Film('Title 2', 'Description 2', 'To-Watch', new Date(), 7, false),
      new Film('Title 3', 'Description 3', 'To-Watch', new Date(), 4, false),
      new Film('AAAAA', 'Description 4', 'Finished', new Date(), 4, false),
      new Film('BBBBBB', 'Description 4', 'Finished', new Date(), 4, false),
      new Film('QWEQWE', 'Description 4', 'To-Watch', new Date(), 4, false),
      new Film('IIIII', 'Description 4', 'Finished', new Date(), 4, true),
      new Film('MMMMM', 'Description 4', 'To-Watch', new Date(), 4, false),
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
     this.filmsChanged.next(this.films.slice());
   }

  deleteIngredient(index: number) {
    this.films.splice(index, 1);
    this.filmsChanged.next(this.films.slice());
  }

  orderFilms() {
    const myfilms = this.films.slice();
    const myfavfilms = myfilms.filter(film => film.fav == true).sort(this.sortbyname);
    const myfinishedfilms = myfilms.filter(film => (film.fav == false && film.status == 'Finished')).sort(this.sortbyname);
    const mytowatchfilms = myfilms.filter(film => film.status == 'To-Watch').sort(this.sortbyname);

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
