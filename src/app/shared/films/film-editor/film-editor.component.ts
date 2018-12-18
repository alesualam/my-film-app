import { Component, OnInit } from '@angular/core';
import { FilmService } from '../films.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Film } from '../film.model';
import { Subscription } from 'rxjs';

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
      'desc': new FormControl(null, [Validators.required]),
      'status': new FormControl(null, [Validators.required]),
      'score': new FormControl(null, [Validators.required])
    });

    this.subscription = this.filmService.startedEditing.subscribe(
      (index:number) => {
        this.editedFilm = this.filmService.getFilm(this.filmService.editedFilmIndex);
        this.filmForm.setValue({
          title: this.editedFilm.title,
          desc: this.editedFilm.desc,
          status: this.editedFilm.status,
          score: this.editedFilm.score,
        });
      }
    )
    this.filmService.startedEditing.next(this.filmService.editedFilmIndex);
  }

  onSubmit() {
    const filmValues = this.filmForm.value;
    const newFilm = new Film(filmValues.title, filmValues.desc, filmValues.status, filmValues.score);

    this.filmService.updateFilm(this.filmService.editedFilmIndex, newFilm);
    this.filmService.editMode = false;
  }

  onCancel() {
    this.filmService.editMode = false;
  }

}
