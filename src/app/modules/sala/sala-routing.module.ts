import { RouterModule, Routes } from '@angular/router';
import { ListarSalaComponent } from './listar-sala/listar-sala.component';
import { CriarSalaComponent } from './criar-sala/criar-sala.component';
import { DetalharSalaComponent } from './detalhar-sala/detalhar-sala.component';

const routes: Routes = [
  { path: '', component: ListarSalaComponent },
  { path: 'criar', component: CriarSalaComponent },
  { path: ':id', component: DetalharSalaComponent },
];

export const SalaRoutingModule = RouterModule.forChild(routes);
