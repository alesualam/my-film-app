import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from './games.service';
import { Game } from './game.model';
import { DataStorageService } from '../data-storage.service';
import { User } from 'src/app/auth/user/user.model';
import { UserService } from 'src/app/auth/user/user.service';
import { StatsService } from 'src/app/auth/user/stats/stats.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit, OnDestroy {

  constructor(private gameService: GameService, private storage: DataStorageService, private userService: UserService,
    private statsService: StatsService) { }

  gameSubscription: Subscription;
  editSubscription: Subscription;
  userSubscription: Subscription;

  uniqueYears: String[];

  games: Game[];
  user: User;
  stats = this.statsService.stats;

  ngOnInit() {

    this.gameSubscription = this.gameService.gamesChanged.subscribe((games) => {
      // Cuando cambia alguna entidad
      this.games = games;
      this.uniqueYears = this.gameService.uniqueYears;

      this.storage.getUser();
      this.userSubscription = this.userService.userSubject.subscribe((user: User) => {
        this.user = user;
        this.statsService.games = this.games;
        this.statsService.user = user;
        this.stats = this.statsService.getStats();
      });
    });
    this.storage.getGames();

    this.editSubscription = this.gameService.isEditing.subscribe((value) => {
      // Cuando se empieza || abandona edición
      // En films se usa para cambiar el layout
    });
  }

  ngOnDestroy() {
    this.gameSubscription.unsubscribe();
    this.editSubscription.unsubscribe();
  }

  onFilter(filter: string) {
    this.gameService.filterStatus = filter;
    this.gameService.isEditing.next(false);
  }

  onYearFilter(year: string) {
    this.gameService.currentYear = year;
  }

  onOrder(method: string) {
    this.gameService.orderStatus = method;
    this.gameService.orderby();
  }

}
