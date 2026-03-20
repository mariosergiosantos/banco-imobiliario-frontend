import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprestimo } from '../models/emprestimo';

@Injectable({ providedIn: 'root' })
export class EmprestimoService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/emprestimos';

  constructor(private readonly http: HttpClient) {}

  listarEmprestimos(salaId: string): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(`${this.apiUrl}/salas/${salaId}`);
  }

  criarEmprestimo(salaId: string, pagadorId: string, recebedorId: string, valorContratado: number, valorAcordado: number): Observable<Emprestimo> {
    return this.http.post<Emprestimo>(`${this.apiUrl}`, { salaId, pagadorId, recebedorId, valorContratado, valorAcordado });
  }

  pagarEmprestimo(salaId: string, emprestimoId: string, pagadorId: string, valor: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${emprestimoId}/pagamento`, { salaId, pagadorId, valor });
  }

  obterEmprestimo(emprestimoId: string): Observable<Emprestimo> {
    return this.http.get<Emprestimo>(`${this.apiUrl}/${emprestimoId}`);
  }
}
