import { Jogador } from "./jogador";
import { Propriedade } from "./propriedade";

export interface Sala {
  id: string;
  nome: string;
  status: 'ABERTA' | 'EM ANDAMENTO' | 'ENCERRADA';
  jogadores: Jogador[];
  propriedades: Propriedade[];
  administrador: Jogador;
  dataCriacao: string;
}
