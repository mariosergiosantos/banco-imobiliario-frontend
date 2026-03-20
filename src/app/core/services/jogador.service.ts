import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jogador } from '../models/jogador';

@Injectable({ providedIn: 'root' })
export class JogadorService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/jogadores';

  constructor(private readonly http: HttpClient) {}

  listarJogadores(salaId: string): Observable<Jogador[]> {
    return this.http.get<Jogador[]>(`${this.apiUrl}/salas/${salaId}`);
  }

  adicionarJogador(salaId: string, nome: string): Observable<Jogador> {
    return this.http.post<Jogador>(`${this.apiUrl}`, { salaId, nome });
  }
}
