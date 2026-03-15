import { Component, OnInit } from '@angular/core';
import { PropriedadeService } from '../../../core/services/propriedade.service';
import { JogadorService } from '../../../core/services/jogador.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Propriedade } from '../../../core/models/propriedade';
import { Jogador } from '../../../core/models/jogador';

@Component({
  selector: 'app-propriedade',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule
  ],
  templateUrl: './propriedade.component.html',
  styleUrl: './propriedade.component.css'
})
export class PropriedadeComponent implements OnInit {
  propriedades: Propriedade[] = [];
  jogadores: Jogador[] = [];
  salaId: string = '';
  mensagem: string = '';
  displayedColumns: string[] = ['nome', 'valorCompra', 'cor', 'hipotecada', 'dono', 'acoes'];

  constructor(
    private readonly propriedadeService: PropriedadeService,
    private readonly jogadorService: JogadorService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.salaId = id;
      this.listarPropriedades();
      this.listarJogadores();
    }
  }

  listarPropriedades() {
    this.propriedadeService.listarPropriedades(this.salaId).subscribe({
      next: (response) => {
        this.propriedades = response;
      },
      error: () => {
        this.mensagem = 'Erro ao carregar propriedades.';
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

  transferirPropriedade(propriedadeId: number, novoDonoId: number) {
    if (!novoDonoId) return;

    this.propriedadeService.transferirPropriedade(propriedadeId, novoDonoId).subscribe({
      next: () => {
        this.listarPropriedades();
        this.mensagem = 'Propriedade transferida com sucesso!';
      },
      error: () => {
        this.mensagem = 'Erro ao transferir propriedade.';
      }
    });
  }
}
