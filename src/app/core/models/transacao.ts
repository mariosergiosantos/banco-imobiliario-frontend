import { Jogador } from './jogador';
import { Propriedade } from './propriedade';

export interface Transacao {
  id: number;
  origem: Jogador | null;
  destino: Jogador | null;
  propriedade: Propriedade | null;
  valor: number;
  dataHora: string;
  tipo: string;
}
