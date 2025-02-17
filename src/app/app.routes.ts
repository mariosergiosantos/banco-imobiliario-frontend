import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
    { path: 'salas', loadChildren: () => import('./modules/sala/sala.module').then(m => m.SalaModule) },
    { path: 'salas/:id/jogadores', loadChildren: () => import('./modules/jogador/jogador.module').then(m => m.JogadorModule) },
    { path: 'salas/:id/propriedades', loadChildren: () => import('./modules/propriedade/propriedade.module').then(m => m.PropriedadeModule) },
    { path: 'salas/:id/transacoes', loadChildren: () => import('./modules/transacao/transacao.module').then(m => m.TransacaoModule) },
    { path: 'salas/:id/emprestimos', loadChildren: () => import('./modules/emprestimo/emprestimo.module').then(m => m.EmprestimoModule) },
];
