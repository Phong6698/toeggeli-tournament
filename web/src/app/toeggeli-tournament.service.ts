import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

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
}

export interface Statistic {
  teamName: string;
  wins: number;
  losses: number;
  goals: number;
  goalsAgainst: number;
  goalDifference: number;
}
