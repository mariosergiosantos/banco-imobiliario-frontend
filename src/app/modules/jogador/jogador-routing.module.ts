import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JogadorComponent } from './jogador/jogador.component';

const routes: Routes = [
  { path: '', component: JogadorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JogadorRoutingModule { }
