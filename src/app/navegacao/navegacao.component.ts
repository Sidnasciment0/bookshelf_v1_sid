import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html',
  styleUrls: ['./navegacao.component.scss']
})
export class NavegacaoComponent {

  // Itens do Menu Principal
  tituloNav = 'BookShelf v1';
  usuario = {userName: 'Sid Nascimento', icone : 'remember_me'}
  // Itens da Barra Superior
  tituloBarra = '[Sua Estante Virtual ]';
  // Itens de Ícones e Imagens de Nav
  iconeGeral = '../../assets/imagens/ShelfBook.png';
  larIcone = 80;
  altIcone = 80;
  // Controle das Rotas do Menu.
  itensMenu = [
    {linkMenu: '/cdd', labelMenu: 'Classes Dewey', hab: true},
    {linkMenu: '/feed', labelMenu: 'Feed Notícias', hab: true},
    {linkMenu: '/clube', labelMenu: 'Página Usuário', hab: true},
    {linkMenu: 'leitura', labelMenu: 'Clubes de Leitura', hab: true},
    {linkMenu: 'estante', labelMenu: 'Estante Particular', hab: true},
    {linkMenu: 'naoCarrega', labelMenu: 'Não aparece para Usuário', hab: false},
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

}
