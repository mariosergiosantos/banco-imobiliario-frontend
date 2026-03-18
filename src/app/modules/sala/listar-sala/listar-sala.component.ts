import { Component, OnInit } from '@angular/core';
import { SalaService } from '../../../core/services/sala.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-sala',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    RouterModule,
  ],
  templateUrl: './listar-sala.component.html',
  styleUrl: './listar-sala.component.css'
})
export class ListarSalaComponent implements OnInit {
  salas: any[] = [];
  mensagem: string = '';
  displayedColumns: string[] = ['id', 'status', 'jogadores', 'dataCriacao', 'acoes'];

  constructor(private readonly salaService: SalaService) { }

  ngOnInit(): void {
    this.listarSalas();
  }

  listarSalas() {
    this.salaService.listarSalas().subscribe({
      next: (response) => {
        this.salas = response;
      },
      error: () => {
        this.mensagem = 'Não foi possível carregar as salas. Verifique sua conexão com o servidor.';
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'ABERTA': return 'accent';
      case 'EM ANDAMENTO': return 'primary';
      case 'ENCERRADA': return 'warn';
      default: return '';
    }
  }
}
