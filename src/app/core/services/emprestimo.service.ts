import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmprestimoService {
  private readonly apiUrl = 'http://localhost:8080/api/v1';

  constructor(private readonly http: HttpClient) {}

  listarEmprestimos(salaId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/salas/${salaId}/emprestimos`);
  }

  criarEmprestimo(emprestadorId: number, tomadorId: number, valor: number, juros: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/emprestimos`, { emprestadorId, tomadorId, valor, juros });
  }

  pagarEmprestimo(emprestimoId: number, valor: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/emprestimos/${emprestimoId}/pagar`, { valor });
  }
}
