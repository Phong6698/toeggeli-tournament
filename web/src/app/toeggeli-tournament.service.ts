import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ToeggeliTournamentService {

  constructor(private angularFirestore: AngularFirestore) {
  }

  getStatistics(): Observable<Statistic[]> {
    return this.angularFirestore.collection(
      'Statistics',
      ref => {
        return ref.orderBy('wins', 'desc').orderBy('goalDifference', 'desc');
      }
    ).valueChanges() as Observable<Statistic[]>;
  }

  getMatchHistory(): Observable<Match[]> {
    return this.angularFirestore.collection(
      'Matches',
      ref => ref.orderBy('timestamp', 'desc')
    ).valueChanges() as Observable<Match[]>;
  }

  getRounds(): Observable<Round[]> {
    return this.angularFirestore.collection('Rounds').valueChanges() as Observable<Round[]>;
  }
}

export interface Statistic {
  teamName: string;
  wins: number;
  losses: number;
  goals: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface Match {
  team1: string;
  team2: string;
  team1Score: number;
  team2Score: number;
  timestamp: firebase.firestore.Timestamp;
}

export interface Round {
  matches: [
    {
      team1: string;
      team2: string;
      played: boolean;
      team1Score?: number;
      team2Score?: number;
    }
  ];
  round: number;
}
