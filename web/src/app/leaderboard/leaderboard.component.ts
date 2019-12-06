import { Component, OnInit } from '@angular/core';
import {Statistic, ToeggeliTournamentService} from '../toeggeli-tournament.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  displayedColumns: string[] = ['rank', 'teamName', 'wins', 'losses', 'goalDifference'];
  statistics$: Observable<Statistic[]>;

  constructor(private toeggeliTournamentService: ToeggeliTournamentService) { }

  ngOnInit() {
    this.statistics$ = this.toeggeliTournamentService.getStatistics();
  }

}
