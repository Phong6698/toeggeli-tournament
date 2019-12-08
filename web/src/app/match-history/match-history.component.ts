import {Component, OnInit} from '@angular/core';
import {Match, ToeggeliTournamentService} from '../toeggeli-tournament.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.scss']
})
export class MatchHistoryComponent implements OnInit {

  matches$: Observable<Match[]>;

  constructor(private toeggeliTournamentService: ToeggeliTournamentService) {
  }

  ngOnInit() {
    this.matches$ = this.toeggeliTournamentService.getMatchHistory();
  }

}
