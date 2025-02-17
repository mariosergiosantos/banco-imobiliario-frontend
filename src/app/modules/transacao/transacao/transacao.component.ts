import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardActions } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TransacaoService } from '../../../core/services/transacao.service';

@Component({
  selector: 'app-transacao',
  imports: [
    CommonModule,
    MatCardActions,
    MatTableModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './transacao.component.html',
  styleUrl: './transacao.component.css'
})
export class TransacaoComponent implements OnInit {
  transacoes: any[] = [];
  mensagem: string = '';

  constructor(private readonly route: ActivatedRoute, private readonly transacaoService: TransacaoService) { }

  ngOnInit(): void {
    this.listarTransacoes()
  }


  listarTransacoes() {
    const id = this.route.snapshot.paramMap.get('id');
    this.transacaoService.listarTransacoes(id).subscribe(
      response => {
        this.transacoes = response;
      },
      () => {
        this.mensagem = 'Erro ao carregar as transacoes.';
      }
    );
  }

}
