import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {MatchHistoryComponent} from './match-history/match-history.component';

const routes: Routes = [
  {path: 'leaderboard', component: LeaderboardComponent},
  {path: 'match-history', component: MatchHistoryComponent},
  {path: '', pathMatch: 'full', redirectTo: 'leaderboard'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
