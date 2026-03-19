import { Component, OnInit } from '@angular/core';
import { EmprestimoService } from '../../../core/services/emprestimo.service';
import { JogadorService } from '../../../core/services/jogador.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Emprestimo } from '../../../core/models/emprestimo';
import { Jogador } from '../../../core/models/jogador';

@Component({
  selector: 'app-emprestimo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './emprestimo.component.html',
  styleUrl: './emprestimo.component.css'
})
export class EmprestimoComponent implements OnInit {
  emprestimos: Emprestimo[] = [];
  jogadores: Jogador[] = [];
  salaId: string = '';
  mensagem: string = '';
  displayedColumns: string[] = ['id', 'emprestador', 'valor', 'acoes'];

  novoEmprestimo = {
    pagadorId: '',
    recebedorId: '',
    valorContratado: 0,
    valorAcordado: 0
  };

  pagamentoEmprestimo = {
    emprestimoId: '',
    pagadorId: '',
    valor: 0
  };

  constructor(
    private readonly emprestimoService: EmprestimoService,
    private readonly jogadorService: JogadorService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.salaId = id;
      this.listarEmprestimos();
      this.listarJogadores();
    }
  }

  listarEmprestimos() {
    this.emprestimoService.listarEmprestimos(this.salaId).subscribe({
      next: (response) => {
        this.emprestimos = response;
      },
      error: () => {
        this.mensagem = 'Erro ao carregar empréstimos.';
      }
    });
  }

  listarJogadores() {
    this.jogadorService.listarJogadores(this.salaId).subscribe({
      next: (response) => {
        this.jogadores = response;
      }
    });
  }

  criarEmprestimo() {
    const { pagadorId, recebedorId, valorContratado, valorAcordado } = this.novoEmprestimo;
    if (!pagadorId || !recebedorId || valorContratado <= 0) {
      this.mensagem = 'Preencha os campos obrigatórios do empréstimo.';
      return;
    }

    this.emprestimoService.criarEmprestimo(this.salaId, pagadorId, recebedorId, valorContratado, valorAcordado).subscribe({
      next: () => {
        this.listarEmprestimos();
        this.mensagem = 'Empréstimo criado com sucesso!';
        this.resetNovoEmprestimo();
      },
      error: () => {
        this.mensagem = 'Erro ao criar empréstimo.';
      }
    });
  }

  pagarEmprestimo() {
    const { emprestimoId, pagadorId, valor } = this.pagamentoEmprestimo;
    if (!emprestimoId || !pagadorId || valor <= 0) {
      this.mensagem = 'Informe o empréstimo, pagador e o valor a pagar.';
      return;
    }

    this.emprestimoService.pagarEmprestimo(this.salaId, emprestimoId, pagadorId, valor).subscribe({
      next: () => {
        this.listarEmprestimos();
        this.mensagem = 'Pagamento de empréstimo realizado!';
        this.resetPagamentoEmprestimo();
      },
      error: () => {
        this.mensagem = 'Erro ao pagar empréstimo.';
      }
    });
  }

  resetNovoEmprestimo() {
    this.novoEmprestimo = { pagadorId: '', recebedorId: '', valorContratado: 0, valorAcordado: 0 };
  }

  resetPagamentoEmprestimo() {
    this.pagamentoEmprestimo = { emprestimoId: '', pagadorId: '', valor: 0 };
  }
}
