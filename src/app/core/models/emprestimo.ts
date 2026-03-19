import { Jogador } from './jogador';

export interface Emprestimo {
  id: string;
  emprestador: Jogador;
  tomador: Jogador;
  valor: number;
  juros: number;
  valorContratado: number;
  valorAcordado: number;
}
