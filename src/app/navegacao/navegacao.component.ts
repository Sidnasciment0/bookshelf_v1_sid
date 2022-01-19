import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { MenuNavegador } from '../modelosInterface/menuNavegador';
import { NavegacaoService } from './../servicosInterface/navegacao.service';

@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html',
  styleUrls: ['./navegacao.component.scss'],
})
export class NavegacaoComponent {
  // Itens do Menu Principal
  tituloNav = 'BookShelf v1';
  // usuario = { userName: 'Sid Nascimento', icone: 'remember_me' };
  // Itens da Barra Superior
  // tituloBarra = '[Sua Estante Virtual ]';
  // Itens de Ícones e Imagens de Nav
  iconeGeral = '../../assets/imagens/ShelfBook.png';
  larIcone = 80;
  altIcone = 80;
  // Controle das Rotas do Menu.
  itensMenu$: Observable <MenuNavegador[]>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private navegadorService: NavegacaoService,
  ) {
    this.itensMenu$ = navegadorService.listagemMenu()
    .pipe(
      catchError(error => {
        return of([])
      })
    )
   };
}
