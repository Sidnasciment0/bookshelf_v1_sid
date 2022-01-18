import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';

import { Generos } from './../modelos/generos';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  private readonly urlAPI='/assets/generos.json';

  constructor(private clienteDados: HttpClient) { }

  listagemGeneros() {
    return this.clienteDados.get<Generos[]>(this.urlAPI)
    .pipe(
      delay(500),
      first(),
      tap(apiGeneros => apiGeneros),
    )
  }
}
