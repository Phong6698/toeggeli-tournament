import {Component, OnInit} from '@angular/core';
import {Round, ToeggeliTournamentService} from '../toeggeli-tournament.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.scss']
})
export class RoundsComponent implements OnInit {

  rounds$: Observable<Round[]>;

  constructor(private toeggeliTournamentService: ToeggeliTournamentService) {
  }

  ngOnInit() {
    this.rounds$ = this.toeggeliTournamentService.getRounds();
  }

}
