import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'salas/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'salas/:id/jogadores',
    renderMode: RenderMode.Server
  },
  {
    path: 'salas/:id/propriedades',
    renderMode: RenderMode.Server
  },
  {
    path: 'salas/:id/transacoes',
    renderMode: RenderMode.Server
  },
  {
    path: 'salas/:id/emprestimos',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
