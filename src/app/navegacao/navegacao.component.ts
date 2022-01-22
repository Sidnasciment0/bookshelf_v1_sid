import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { MenuNavegador } from '../modelosInterface/menuNavegador';
import { AppLoginComponent } from './../app-login/app-login.component';
import { AutenticacaoFirebaseService } from './../servicosInterface/autenticacao-firebase.service';
import { NavegacaoService } from './../servicosInterface/navegacao.service';

@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html',
  styleUrls: ['./navegacao.component.scss'],
})
export class NavegacaoComponent {
  usuario$ = this.autenticacaoFirebaseService.usuarioLogado$;
  // Itens do Menu Principal
  logoMenu='../../assets/imagens/logoBS4.png';
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
    private telaLogin: MatDialog,
    private rotas: Router,
    private autenticacaoFirebaseService: AutenticacaoFirebaseService,
    private navegadorService: NavegacaoService,
  ) {
    this.itensMenu$ = navegadorService.listagemMenu()
    .pipe(
      catchError(error => {
        return of([])
      })
    )
   };

   abrirLogin(erroMsg: string) {
    this.telaLogin.open(AppLoginComponent, {
      data:erroMsg
    })
   }

   sairUsuario() {
    this.autenticacaoFirebaseService.sairLogin().subscribe(() =>
      this.rotas.navigate([''])
    )
   }
}
