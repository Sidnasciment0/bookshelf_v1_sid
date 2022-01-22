import { AppCadastroComponent } from './app-cadastro/app-cadastro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeedComponent } from './feed/feed.component';

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
    path: "feed",
     component: FeedComponent
  },
  // Rota do Módulo
  {
    path: "cdd",
    loadChildren: () => import("./cdd/cdd.module").then(c => c.CddModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
