import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {BreakpointObserver} from '@angular/cdk/layout';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {SwUpdate} from '@angular/service-worker';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();

  title = 'toeggeli-tournament';
  version = environment.version;
  sideNavMode: 'over' | 'push' | 'side' = 'push';
  sideNavWidthClass: 'width-auto' | 'width-fixed' = 'width-auto';

  constructor(private breakpointObserver: BreakpointObserver, private swUpdate: SwUpdate,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.matSnackBar.open('New version available. Load new version?', 'Ok')
          .onAction().pipe(takeUntil(this.destroy$))
          .subscribe(() => window.location.reload());
      });
    }

    this.breakpointObserver.observe(['(max-width: 575.98px)', '(min-width: 992px)']).pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result.breakpoints['(min-width: 992px)']) {
          this.sideNavMode = 'side';
          this.sideNavWidthClass = 'width-fixed';
        } else if (result.breakpoints['(max-width: 575.98px)']) {
          this.sideNavMode = 'push';
          this.sideNavWidthClass = 'width-auto';
        } else {
          this.sideNavMode = 'push';
          this.sideNavWidthClass = 'width-fixed';
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
