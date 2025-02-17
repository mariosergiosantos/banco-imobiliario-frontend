import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransacaoComponent } from './transacao/transacao.component';

const routes: Routes = [
  { path: '', component: TransacaoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransacaoRoutingModule { }
