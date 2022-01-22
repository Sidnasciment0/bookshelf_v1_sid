import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Dashboard } from './../modelosInterface/dashboard';
import { AutenticacaoFirebaseService } from './../servicosInterface/autenticacao-firebase.service';
import { DashboardService } from './../servicosInterface/dashboard.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  cards$: Observable<Dashboard[]>;
  usuario$ = this.autenticacaoFirebaseService.usuarioLogado$;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe( // Depois migrar essa variável para breakpoints.
    map(({ matches }) => {
      if (matches) {
        return this.cards$
      }

      return this.cards$
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dashboardService: DashboardService,
    private autenticacaoFirebaseService: AutenticacaoFirebaseService
  ) {
    this.cards$ = dashboardService.listagemCards()
    .pipe(
      catchError(error => {
        return of([])
      })
    )
  };
}
