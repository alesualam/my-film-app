import { Game } from './game.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class GameService {

    gamesChanged = new Subject<Game[]>();
    startedEditing = new Subject<number>();
    isEditing = new Subject<boolean>();
    games: Game[] = [{
        'title': "",
        'platform': "",
        'desc': "",
        'score': 0,
        'status': "",
        'start_date': new Date(),
        'finish_date': new Date(),
        'fav': false,
        'image': "",
        'completion': 0
    }];

    scores = Array.from(Array(11).keys()).reverse();

    filterStatus = '';
    status_p = [
        'Finished',
        'In_Progress',
        'To_Play',
    ];
    orderStatus = '';
    uniqueYears = [];
    currentYear = '';

    getGames() {
        this.orderby();
        return this.games.slice();
    }

    getGame(index: number) {
        return this.games[index];
    }

    addGame(game: Game) {
        this.games.push(game);
        this.orderby();
        this.gamesChanged.next(this.games.slice());
    }

    updateGame(index: number, game: Game) {
        this.games[index] = game;
        this.gamesChanged.next(this.games.slice());
    }

    deleteGame(index: number) {
        this.games.splice(index, 1);
        this.gamesChanged.next(this.games.slice());
    }

    setGames(games: Game[]) {
        this.games = games;
    
        let yearsCollection = games.map(a => a.finish_date).filter((el) => {
          return el !== undefined;
        }).map(b => b.toString().split('-')[0]);
    
        this.uniqueYears = Array.from(new Set(yearsCollection)).sort().reverse();
    
        this.gamesChanged.next(this.games.slice());
    }

    orderby() {
        if(this.orderStatus === 'title') {
          this.games = this.games.sort(this.sortbyname);
        } else if (this.orderStatus === 'latest') {
          this.games = this.games.sort(this.sortbydate);
        } else {
          const games = this.games;
          const fav_games = games.filter(game => game.fav === true).sort(this.sortbyname);
          const finished_games = games.filter(game => (game.fav === false && game.status === 'Finished')).sort(this.sortbyname);
          const progress_games = games.filter(game => (game.status === 'In_Progress')).sort(this.sortbydate);
          const toplay_games = games.filter(game => game.status === 'To_Play').sort(this.sortbyname);
      
          this.games = Array.prototype.concat(fav_games, finished_games, progress_games, toplay_games);
        }
        this.gamesChanged.next(this.games.slice());
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