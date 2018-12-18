import { Injectable } from "@angular/core";
import { FilmService } from "./films/films.service"
import { Film } from "./films/film.model";

import 'rxjs/Rx';
import { AuthService } from "../auth/auth.service";
import { HttpClient, HttpParams, HttpRequest } from "@angular/common/http";

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient, private filmService: FilmService, private authService: AuthService) {}

    storeFilms() {
        const req = new HttpRequest('PUT', 'https://ng-custom-app.firebaseio.com/films.json', this.filmService.getFilms(), {
            reportProgress: true,
        });
        console.log(req);
        return this.httpClient.request(req);
    }

    getFilms() {
        const token = this.authService.getToken();

        this.httpClient.get<Film[]>('https://ng-custom-app.firebaseio.com/films.json', {
        })
        .subscribe(
            (recipes: Film[]) => {
                this.filmService.setFilms(recipes);
            }
        )
    }
}