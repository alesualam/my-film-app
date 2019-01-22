import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from './games.service';
import { Game } from './game.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  constructor(private gamesService: GameService) { }

  gameSubscription: Subscription;
  editSubscription: Subscription;

  games: Game[];

  ngOnInit() {

    // TODO recuperar games de BBDD
    //
    this.gameSubscription = this.gamesService.gamesChanged.subscribe((games) => {
      // Cuando cambia alguna entidad
      this.games = games;

    });

    this.editSubscription = this.gamesService.isEditing.subscribe((value) => {
      // Cuando se empieza || abandona edición
      // En films se usa para cambiar el layout
    });

  }

}
