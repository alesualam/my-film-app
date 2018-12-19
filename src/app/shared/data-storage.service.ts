import { Injectable } from "@angular/core";
import { FilmService } from "./films/films.service"
import { Film } from "./films/film.model";

import 'rxjs/Rx';
import { AuthService } from "../auth/auth.service";
import { HttpClient, HttpParams, HttpRequest } from "@angular/common/http";
import { Subject } from 'rxjs/Rx';

@Injectable()
export class DataStorageService {

    saveObservable = new Subject<boolean>();
    saveSuccess = false;

    constructor(private httpClient: HttpClient, private filmService: FilmService, private authService: AuthService) {}

    storeFilms() {
        const req = new HttpRequest('PUT', 'https://ng-custom-app.firebaseio.com/' + this.authService.getUid() + '/films.json', this.filmService.getFilms(), {
            reportProgress: true,
        });
        console.log(req);
        return this.httpClient.request(req);
    }

    getFilms() {
        const token = this.authService.getToken();

        this.httpClient.get<Film[]>('https://ng-custom-app.firebaseio.com/' + this.authService.getUid() + '/films.json', {
        })
        .subscribe(
            (films: Film[]) => {
                if (films === null) {
                    films = [];
                }
                this.filmService.setFilms(films);
            }
        )
    }
}