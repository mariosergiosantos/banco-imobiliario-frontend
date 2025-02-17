import { Component, OnInit } from '@angular/core';
import { SalaService } from '../../../core/services/sala.service';
import { MatCardActions } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-sala',
  standalone: true,
  imports: [
    CommonModule,
    MatCardActions,
    MatTableModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './listar-sala.component.html',
  styleUrl: './listar-sala.component.css'
})
export class ListarSalaComponent implements OnInit {
  salas: any[] = [];
  mensagem: string = '';

  constructor(private readonly salaService: SalaService) { }

  ngOnInit(): void {
    this.listarSalas();
  }

  listarSalas() {
    this.salaService.listarSalas().subscribe(
      response => {
        this.salas = response;
      },
      () => {
        this.mensagem = 'Erro ao carregar as salas.';
      }
    );
  }

}
