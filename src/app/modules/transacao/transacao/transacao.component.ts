import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TransacaoService } from '../../../core/services/transacao.service';
import { JogadorService } from '../../../core/services/jogador.service';
import { Jogador } from '../../../core/models/jogador';
import { Transacao } from '../../../core/models/transacao';
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
    RouterModule,
  ],
  templateUrl: './transacao.component.html',
  styleUrl: './transacao.component.css'
})
export class TransacaoComponent implements OnInit {
  transacoes: Transacao[] = [];
  jogadores: Jogador[] = [];
  salaId: string | null = null;
  mensagem: string = '';

  pagamento = {
    devedorId: 0,
    credorId: 0,
    valor: 0
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly transacaoService: TransacaoService,
    private readonly jogadorService: JogadorService
  ) { }

  ngOnInit(): void {
    this.salaId = this.route.snapshot.paramMap.get('id');
    if (this.salaId) {
      this.listarTransacoes();
      this.listarJogadores();
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

  realizarPagamento() {
    if (!this.pagamento.devedorId || !this.pagamento.credorId || this.pagamento.valor <= 0) {
      this.mensagem = 'Preencha todos os campos do pagamento.';
      return;
    }

    this.transacaoService.realizarPagamento(this.pagamento.devedorId, this.pagamento.credorId, this.pagamento.valor).subscribe({
      next: () => {
        this.listarTransacoes();
        this.mensagem = 'Pagamento realizado com sucesso!';
        this.pagamento = { devedorId: 0, credorId: 0, valor: 0 };
      },
      error: () => {
        this.mensagem = 'Erro ao realizar pagamento.';
      }
    });
  }
}
