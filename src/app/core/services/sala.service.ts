import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sala } from '../models/sala';

@Injectable({ providedIn: 'root' })
export class SalaService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/salas';

  constructor(private readonly http: HttpClient) {}

  listarSalas(): Observable<Sala[]> {
    return this.http.get<Sala[]>(`${this.apiUrl}`);
  }

  criarSala(nomeJogadorAdm: string): Observable<Sala> {
    return this.http.post<Sala>(this.apiUrl, { nomeJogadorAdm });
  }

  obterSala(id: string): Observable<Sala> {
    return this.http.get<Sala>(`${this.apiUrl}/${id}`);
  }

  iniciarJogo(salaId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${salaId}/iniciar`, {});
  }

  finalizarJogo(salaId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${salaId}/finalizar`, {});
  }
}
