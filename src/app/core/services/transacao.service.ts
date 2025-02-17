import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransacaoService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/transacoes';

  constructor(private readonly http: HttpClient) {}

  listarTransacoes(salaId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/salas/${salaId}`);
  }

  realizarPagamento(devedorId: number, credorId: number, valor: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/salas/${devedorId}/pagamento`, { credorId, valor });
  }
}
