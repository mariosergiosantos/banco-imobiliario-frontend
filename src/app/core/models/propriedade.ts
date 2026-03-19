import { Jogador } from './jogador';

export interface Propriedade {
  id: string;
  nome: string;
  valorCompra: number;
  cor: string;
  hipotecada: boolean;
  dono: Jogador | null;
}
