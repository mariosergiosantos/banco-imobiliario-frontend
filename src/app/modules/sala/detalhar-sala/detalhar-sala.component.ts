import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SalaService } from '../../../core/services/sala.service';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detalhar-sala',
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './detalhar-sala.component.html',
  styleUrl: './detalhar-sala.component.css'
})
export class DetalharSalaComponent implements OnInit {

  sala: any = null;
  mensagem: string = '';
  displayedColumnsJogadores: string[] = ['nome', 'saldo', 'isAdmin'];
  displayedColumnsPropriedades: string[] = ['nome', 'valorCompra', 'cor', 'hipotecada', 'dono'];

  constructor(private readonly route: ActivatedRoute, private readonly salaService: SalaService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.salaService.obterSala(id).subscribe(
        response => this.sala = response,
        () => this.mensagem = 'Erro ao carregar detalhes da sala.'
      );
    }
  }

}
