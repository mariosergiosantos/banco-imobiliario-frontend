import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TransacaoService } from '../../../core/services/transacao.service';
import { JogadorService } from '../../../core/services/jogador.service';
import { PropriedadeService } from '../../../core/services/propriedade.service';
import { Jogador } from '../../../core/models/jogador';
import { Transacao, TipoTransacao } from '../../../core/models/transacao';
import { Propriedade } from '../../../core/models/propriedade';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transacao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './transacao.component.html',
  styleUrl: './transacao.component.css'
})
export class TransacaoComponent implements OnInit {
  transacoes: Transacao[] = [];
  jogadores: Jogador[] = [];
  propriedades: Propriedade[] = [];
  salaId: string | null = null;
  mensagem: string = '';

  tiposTransacao = Object.values(TipoTransacao);

  transacaoForm: any = {
    tipoTransacao: TipoTransacao.PAGAMENTO_ALUGUEL,
    compradorId: '',
    jogadorId: '',
    propriedadeId: '',
    valor: 0
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly transacaoService: TransacaoService,
    private readonly jogadorService: JogadorService,
    private readonly propriedadeService: PropriedadeService
  ) { }

  ngOnInit(): void {
    this.salaId = this.route.snapshot.paramMap.get('id');
    if (this.salaId) {
      this.listarTransacoes();
      this.listarJogadores();
      this.listarPropriedades();
    }
  }

  listarTransacoes() {
    this.transacaoService.listarTransacoes(this.salaId).subscribe({
      next: (response) => {
        this.transacoes = response;
      },
      error: () => {
        this.mensagem = 'Erro ao carregar as transacoes.';
      }
    });
  }

  listarJogadores() {
    if (this.salaId) {
      this.jogadorService.listarJogadores(this.salaId).subscribe({
        next: (response) => {
          this.jogadores = response;
        }
      });
    }
  }

  listarPropriedades() {
    if (this.salaId) {
      this.propriedadeService.listarPropriedades(this.salaId).subscribe({
        next: (response) => {
          this.propriedades = response;
        }
      });
    }
  }

  realizarTransacao() {
    if (!this.salaId) return;

    const payload: any = {
      tipoTransacao: this.transacaoForm.tipoTransacao
    };

    switch (this.transacaoForm.tipoTransacao) {
      case TipoTransacao.COMPRA_PROPRIEDADE_DO_BANCO:
        payload.compradorId = this.transacaoForm.compradorId;
        payload.propriedadeId = this.transacaoForm.propriedadeId;
        break;
      case TipoTransacao.COMPRA_PROPRIEDADE_JOGADOR:
        payload.compradorId = this.transacaoForm.compradorId;
        payload.propriedadeId = this.transacaoForm.propriedadeId;
        payload.valor = this.transacaoForm.valor;
        break;
      case TipoTransacao.PAGAMENTO_ALUGUEL:
        payload.jogadorId = this.transacaoForm.jogadorId;
        payload.propriedadeId = this.transacaoForm.propriedadeId;
        break;
      case TipoTransacao.PAGAMENTO_SALARIO:
        payload.jogadorId = this.transacaoForm.jogadorId;
        break;
      case TipoTransacao.CONSTRUIR_PROPRIEDADE:
        payload.jogadorId = this.transacaoForm.jogadorId;
        payload.propriedadeId = this.transacaoForm.propriedadeId;
        break;
      // Outros casos podem ser adicionados conforme necessário
    }

    this.transacaoService.realizarTransacao(this.salaId, payload).subscribe({
      next: () => {
        this.listarTransacoes();
        this.mensagem = 'Transação realizada com sucesso!';
        this.resetForm();
      },
      error: () => {
        this.mensagem = 'Erro ao realizar transação.';
      }
    });
  }

  resetForm() {
    this.transacaoForm = {
      tipoTransacao: TipoTransacao.PAGAMENTO_ALUGUEL,
      compradorId: '',
      jogadorId: '',
      propriedadeId: '',
      valor: 0
    };
  }
}
