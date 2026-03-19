import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transacao } from '../models/transacao';

@Injectable({ providedIn: 'root' })
export class TransacaoService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/transacoes';

  constructor(private readonly http: HttpClient) {}

  listarTransacoes(salaId: string | null): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(`${this.apiUrl}/salas/${salaId}`);
  }

  realizarTransacao(salaId: string, payload: any): Observable<Transacao> {
    return this.http.post<Transacao>(`${this.apiUrl}/salas/${salaId}`, payload);
  }
}
