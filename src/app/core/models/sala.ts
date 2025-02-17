import { Jogador } from "./jogador";

export interface Sala {
    id: string;
    nome: string;
    status: 'ABERTA' | 'EM ANDAMENTO' | 'ENCERRADA';
    jogadores: Jogador[];
  }