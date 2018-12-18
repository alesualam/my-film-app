import { Film } from './film.model';
import { Subject } from 'rxjs';

export class FilmService {
    filmsChanged = new Subject<Film[]>();
    startedEditing = new Subject<number>();
    editMode = false;
    editedFilmIndex: number;
    currentFilm: Film;

    private films: Film[] = [
      new Film('Title 1', 'Description 1', 'finished', 10),
      new Film('Title 2', 'Description 2', 'finished', 7),
      new Film('Title 3', 'Description 3', 'finished', 4),
    ];

  getFilms() {
    return this.films.slice();
  }

//   addIngredient(ingredient: Ingredient) {
//     this.ingredients.push(ingredient);
//     this.ingredientsChanged.next(this.ingredients.slice());
//   }

//   addIngredients(ingredients: Ingredient[]) {
//     // for (let ingredient of ingredients) {
//     //   this.addIngredient(ingredient);
//     // }
//     this.ingredients.push(...ingredients);
//     this.ingredientsChanged.next(this.ingredients.slice());
//   }

   getFilm(index: number) {
     return this.films[index];
   }

   updateFilm(index: number, newFilm: Film) {
     this.films[index] = newFilm;
     this.filmsChanged.next(this.films.slice());
   }

//   deleteIngredient(index: number) {
//     this.ingredients.splice(index, 1);
//     this.ingredientsChanged.next(this.ingredients.slice());
//   }
}
