import { Component } from '@angular/core';
import { SalaService } from '../../../core/services/sala.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-criar-sala',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './criar-sala.component.html',
  styleUrl: './criar-sala.component.css'
})
export class CriarSalaComponent {
  nomeJogador: string = '';
  mensagem: string = '';

  constructor(
    private readonly salaService: SalaService,
    private readonly router: Router
  ) { }

  criarSala() {
    if (!this.nomeJogador) {
      this.mensagem = 'Por favor, informe o nome do jogador.';
      return;
    }

    this.salaService.criarSala(this.nomeJogador).subscribe({
      next: (sala) => {
        this.router.navigate(['/salas', sala.id]);
      },
      error: () => {
        this.mensagem = 'Erro ao criar a sala.';
      }
    });
  }
}
