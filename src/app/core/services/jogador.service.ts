import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JogadorService {
  private readonly apiUrl = 'http://localhost:8080/api/v1';

  constructor(private readonly http: HttpClient) {}

  listarJogadores(salaId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/jogadores/salas/${salaId}`);
  }

  adicionarJogador(salaId: string, nome: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/jogadores`, { salaId, nome });
  }
}
