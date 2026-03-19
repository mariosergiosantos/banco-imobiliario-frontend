import { Jogador } from './jogador';
import { Propriedade } from './propriedade';

export enum TipoTransacao {
  COMPRA_PROPRIEDADE_DO_BANCO = 'COMPRA_PROPRIEDADE_DO_BANCO',
  COMPRA_PROPRIEDADE_JOGADOR = 'COMPRA_PROPRIEDADE_JOGADOR',
  CONSTRUIR_PROPRIEDADE = 'CONSTRUIR_PROPRIEDADE',
  PAGAMENTO_ALUGUEL = 'PAGAMENTO_ALUGUEL',
  HIPOTECA = 'HIPOTECA',
  PAGAMENTO_SALARIO = 'PAGAMENTO_SALARIO',
  EMPRESTIMO = 'EMPRESTIMO',
  PAGAMENTO_EMPRESTIMO = 'PAGAMENTO_EMPRESTIMO'
}

export interface Transacao {
  id: string;
  origem: Jogador | null;
  destino: Jogador | null;
  propriedade: Propriedade | null;
  valor: number;
  dataHora: string;
  tipoTransacao: TipoTransacao;
}
