import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {MatchHistoryComponent} from './match-history/match-history.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {MatCardModule} from '@angular/material/card';
import {registerLocaleData} from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';
import {ServiceWorkerModule} from '@angular/service-worker';
import {MatSnackBarModule} from '@angular/material/snack-bar';

registerLocaleData(localeDECH);

@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent,
    MatchHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatSnackBarModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'de-ch'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
