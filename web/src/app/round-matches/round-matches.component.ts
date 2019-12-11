import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {RoundMatch, ToeggeliTournamentService} from '../toeggeli-tournament.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-round-matches',
  templateUrl: './round-matches.component.html',
  styleUrls: ['./round-matches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoundMatchesComponent implements OnInit {

  @Input() round: number;

  matches$: Observable<RoundMatch[]>;

  constructor(private toeggeliTournamentService: ToeggeliTournamentService) {
  }

  ngOnInit() {
    this.matches$ = this.toeggeliTournamentService.getRoundMatchesByRound(this.round);
  }

}
