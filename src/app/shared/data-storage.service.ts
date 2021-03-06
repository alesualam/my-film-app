import { Injectable } from "@angular/core";
import { FilmService } from "./films/films.service"
import { Film } from "./films/film.model";

import 'rxjs/Rx';
import { AuthService } from "../auth/auth.service";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { Subject } from 'rxjs/Rx';
import { User } from '../auth/user/user.model';
import { UserService } from '../auth/user/user.service';
import { GameService } from './games/games.service';
import { Game } from './games/game.model';

@Injectable()
export class DataStorageService {

    saveObservable = new Subject<boolean>();
    saveSuccess = false;

    constructor(private httpClient: HttpClient, private filmService: FilmService, private authService: AuthService,
        private userService: UserService, private gameService: GameService) {}

    getUser() {
        const token = this.authService.getToken();

        this.httpClient.get<User>('https://ng-custom-app.firebaseio.com/' + this.authService.getUid() + '/user.json').subscribe(
            (user: User) => {
                if (user !== null) {
                    this.userService.user = user;
                    this.userService.userSubject.next(user);
                }
            }
        );
    }

    saveUser() {
        const req = new HttpRequest('PUT', 'https://ng-custom-app.firebaseio.com/' + this.authService.getUid() + '/user.json', this.userService.getUser(), {
            reportProgress: true,
        });
        return this.httpClient.request(req);
    }

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

    storeGames() {
        const req = new HttpRequest('PUT', 'https://ng-custom-app.firebaseio.com/' + this.authService.getUid() + '/games.json', this.gameService.getGames(), {
            reportProgress: true,
        });
        console.log(req);
        return this.httpClient.request(req);
    }

    getGames() {
        const token = this.authService.getToken();

        this.httpClient.get<Game[]>('https://ng-custom-app.firebaseio.com/' + this.authService.getUid() + '/games.json', {
        })
        .subscribe(
            (games: Game[]) => {
                if (games === null) {
                    games = [];
                }
                this.gameService.setGames(games);
            }
        )
    }
}