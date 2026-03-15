import { Jogador } from './jogador';

export interface Emprestimo {
  id: number;
  emprestador: Jogador;
  tomador: Jogador;
  valor: number;
  juros: number;
}
