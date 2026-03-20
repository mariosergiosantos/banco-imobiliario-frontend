import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SalaService } from '../../../core/services/sala.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Sala } from '../../../core/models/sala';

@Component({
  selector: 'app-detalhar-sala',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './detalhar-sala.component.html',
  styleUrl: './detalhar-sala.component.css'
})
export class DetalharSalaComponent implements OnInit {

  sala: Sala | null = null;
  mensagem: string = '';
  displayedColumnsJogadores: string[] = ['nome', 'saldo', 'isAdmin'];
  displayedColumnsPropriedades: string[] = ['nome', 'valorCompra', 'cor', 'hipotecada', 'dono'];

  constructor(private readonly route: ActivatedRoute, private readonly salaService: SalaService) { }

  ngOnInit(): void {
    this.carregarSala();
  }

  carregarSala() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.salaService.obterSala(id).subscribe({
        next: (response) => this.sala = response,
        error: () => this.mensagem = 'Erro ao carregar detalhes da sala.'
      });
    }
  }

  iniciarJogo() {
    if (this.sala) {
      this.salaService.iniciarJogo(this.sala.id).subscribe({
        next: () => {
          this.mensagem = 'Jogo iniciado com sucesso!';
          this.carregarSala();
        },
        error: () => this.mensagem = 'Erro ao iniciar o jogo.'
      });
    }
  }

  finalizarJogo() {
    if (this.sala) {
      this.salaService.finalizarJogo(this.sala.id).subscribe({
        next: () => {
          this.mensagem = 'Jogo finalizado com sucesso!';
          this.carregarSala();
        },
        error: () => this.mensagem = 'Erro ao finalizar o jogo.'
      });
    }
  }

}
