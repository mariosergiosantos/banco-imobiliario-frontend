import { Component, OnInit } from '@angular/core';
import { JogadorService } from '../../../core/services/jogador.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Jogador } from '../../../core/models/jogador';

@Component({
  selector: 'app-jogador',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './jogador.component.html',
  styleUrl: './jogador.component.css'
})
export class JogadorComponent implements OnInit {
  jogadores: Jogador[] = [];
  salaId: string = '';
  novoJogadorNome: string = '';
  mensagem: string = '';
  displayedColumns: string[] = ['id', 'nome', 'saldo'];

  constructor(
    private readonly jogadorService: JogadorService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.salaId = id;
      this.listarJogadores();
    }
  }

  listarJogadores() {
    this.jogadorService.listarJogadores(this.salaId).subscribe({
      next: (response) => {
        this.jogadores = response;
      },
      error: () => {
        this.mensagem = 'Erro ao carregar jogadores.';
      }
    });
  }

  adicionarJogador() {
    if (!this.novoJogadorNome) {
      this.mensagem = 'Informe o nome do jogador.';
      return;
    }

    this.jogadorService.adicionarJogador(this.salaId, this.novoJogadorNome).subscribe({
      next: () => {
        this.novoJogadorNome = '';
        this.listarJogadores();
        this.mensagem = 'Jogador adicionado com sucesso!';
      },
      error: () => {
        this.mensagem = 'Erro ao adicionar jogador.';
      }
    });
  }
}
