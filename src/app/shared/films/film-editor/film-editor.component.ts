import { Component, OnInit } from '@angular/core';
import { FilmService } from '../films.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Film } from '../film.model';
import { Subscription } from 'rxjs';
import { scoreRequired } from './film-valid.directive';
import { ImagesService } from '../../images.service';

@Component({
  selector: 'app-film-editor',
  templateUrl: './film-editor.component.html',
  styleUrls: ['./film-editor.component.css']
})
export class FilmEditorComponent implements OnInit {

  subscription: Subscription;
  imageSubscription: Subscription;
  filmForm: FormGroup;
  editedFilm: Film;
  imageUrl = '';
  imageArray = [];
  imageIndex = 0;
  constructor(private filmService: FilmService, private image: ImagesService) { }

  ngOnInit() {
    this.filmForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'desc': new FormControl(null),
      'status': new FormControl(null, [Validators.required]),
      'date': new FormControl(null),
      'score': new FormControl(null),
      'fav': new FormControl(false),
      'image': new FormControl(null),
    }, {validators: scoreRequired});

    this.imageSubscription = this.image.imageUrlObservable.subscribe(value => {
      this.imageArray = value;
      this.imageUrl = this.imageArray[this.imageIndex]['link'];
    })

    if(this.filmService.editMode) {
      this.subscription = this.filmService.startedEditing.subscribe(
        (index: number) => {
          this.editedFilm = this.filmService.getFilm(this.filmService.editedFilmIndex);
          this.imageArray = [];
          this.imageUrl = '';
          this.imageIndex = 0;
          this.imageUrl = this.editedFilm.image;
          if(this.editedFilm.status !== 'To-Watch') {
            this.filmForm.patchValue({
              title: this.editedFilm.title,
              desc: this.editedFilm.desc,
              status: this.editedFilm.status,
              date: this.editedFilm.date,
              score: this.editedFilm.score,
              fav: this.editedFilm.fav,
              image: this.editedFilm.image,
            });
          } else {
            this.filmForm.patchValue({
              title: this.editedFilm.title,
              desc: this.editedFilm.desc,
              status: this.editedFilm.status,
              image: this.editedFilm.image,
            });
          }
        }
      )
      this.filmService.startedEditing.next(this.filmService.editedFilmIndex);
      } else {
        const patched_status = this.filmService.filterStatus === 'Favorite' ? 'Finished' : this.filmService.filterStatus;
        const patched_fav = this.filmService.filterStatus === 'Favorite' ? true : false;
        const patched_date = new Date().toLocaleDateString().split('/');
        const year = patched_date[2];
        const month = patched_date[1];
        const day = patched_date[0];
        const new_date = [year, day, month].join('-');
        console.log(patched_date);
        // 2018-10-12
        // TODO
        this.filmForm.patchValue({
          status: patched_status,
          fav: patched_fav,
          date: patched_date,
        });
      }
  }

  onSubmit() {
    const filmValues = this.filmForm.value;
    const newFilm = new Film(filmValues.title, filmValues.desc, filmValues.status, filmValues.date, filmValues.score, filmValues.fav, filmValues.image);

    if (this.filmService.editMode) {
      if (newFilm.status === 'To-Watch') {
        newFilm.date = null;
        newFilm.score = null;
        newFilm.fav = null;
      }
      this.filmService.updateFilm(this.filmService.editedFilmIndex, newFilm);
      this.filmService.editMode = false;
    } else {
      newFilm.date = newFilm.date === null ? new Date() : newFilm.date;
      newFilm.desc = newFilm.desc === null ? '' : newFilm.desc;
      this.filmService.addFilm(newFilm);
      this.filmService.createMode = false;
    }
  }

  onCancel() {
    this.filmService.editMode = false;
    this.filmService.createMode = false;
    this.filmService.isEditing.next(false);
  }

  onClear() {
    this.filmForm.reset();
  }

  onImage() {
    let query = this.filmForm.get('title')['value'] + ' film poster';

    if(this.imageArray.length == 0) {
      this.image.getImage(query);
    } else {
      if(this.imageIndex < 10) {
        this.imageIndex++;
        this.imageUrl = this.imageArray[this.imageIndex]['link'];
        console.log(this.imageUrl);
        this.filmForm.patchValue({
          image: this.imageUrl,
        });
      } else {
        this.imageIndex = 0;
      }
    }
  }

  onDelete() {
    let deleteFlag = false;
    deleteFlag = confirm("Are you sure?");

    if(deleteFlag) {
      this.filmService.isEditing.next(false);
      this.filmService.deleteFilm(this.filmService.getFilms().indexOf(this.editedFilm));
      this.filmService.editMode = false;
      this.filmService.createMode = false;
    }
  }
}
