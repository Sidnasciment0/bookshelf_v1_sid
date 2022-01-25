import { NgModule } from '@angular/core';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { AppCadastroComponent } from './app-cadastro/app-cadastro.component';
import { FeedComponent } from './feed/feed.component';

const enviarSemLogin = () => redirectUnauthorizedTo(['/app-app-cadastro']);

const routes: Routes = [
  {
    path: "", pathMatch:"full", redirectTo: "app-app-cadastro"
  },
  {
    path: 'app-app-cadastro',
    component: AppCadastroComponent
  },
  // Rota de Componente
  {
    path: 'feed',
    component: FeedComponent,
    ...canActivate(enviarSemLogin)
  },
  // Rota do Módulo
  {
    path: "cdd",
    loadChildren: () => import('./cdd/cdd.module').then(c => c.CddModule),
    ...canActivate(enviarSemLogin)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
