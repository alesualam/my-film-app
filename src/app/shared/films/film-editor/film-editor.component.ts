import { Component, OnInit } from '@angular/core';
import { FilmService } from '../films.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Film } from '../film.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-film-editor',
  templateUrl: './film-editor.component.html',
  styleUrls: ['./film-editor.component.css']
})
export class FilmEditorComponent implements OnInit {

  subscription: Subscription;
  filmForm: FormGroup;
  editedFilm: Film;
  constructor(private filmService: FilmService) { }


  ngOnInit() {
    this.filmForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'desc': new FormControl(null),
      'status': new FormControl(null, [Validators.required]),
      'date': new FormControl(null),
      'score': new FormControl(null),
      'fav': new FormControl(false)
    });

    if(this.filmService.editMode) {
      this.subscription = this.filmService.startedEditing.subscribe(
        (index: number) => {
            this.editedFilm = this.filmService.getFilm(this.filmService.editedFilmIndex);
            this.filmForm.setValue({
              title: this.editedFilm.title,
              desc: this.editedFilm.desc,
              status: this.editedFilm.status,
              date: this.editedFilm.date,
              score: this.editedFilm.score,
              fav: this.editedFilm.fav
            });
        }
      )
      this.filmService.startedEditing.next(this.filmService.editedFilmIndex);
      } else {
        this.filmForm.patchValue({
          status: this.filmService.filterStatus
        })
      }
  }

  onSubmit() {
    const filmValues = this.filmForm.value;
    const newFilm = new Film(filmValues.title, filmValues.desc, filmValues.status, filmValues.date, filmValues.score, filmValues.fav);

    if (this.filmService.editMode) {
      this.filmService.updateFilm(this.filmService.editedFilmIndex, newFilm);
      this.filmService.editMode = false;
    } else {
      this.filmService.addFilm(newFilm)
      this.filmService.createMode = false;
    }
  }

  onCancel() {
    this.filmService.editMode = false;
    this.filmService.createMode = false;
  }

  onClear() {
    this.filmForm.reset();
  }
}
