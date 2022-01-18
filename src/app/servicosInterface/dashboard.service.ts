import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

import { Dashboard } from './../modelosInterface/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly uriAPI='../../assets/dashboard.json'

  constructor(private cardDashboard: HttpClient) { }

  listagemCards() {
    return this.cardDashboard.get<Dashboard[]>(this.uriAPI)
    .pipe(
      first(),
      tap(apiDashboard => console.log(apiDashboard)),
    )
  }
}
