import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SalaService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/salas';

  constructor(private readonly http: HttpClient) {}

  listarSalas(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  criarSala(nomeJogador: string): Observable<any> {
    return this.http.post(this.apiUrl, { nomeJogador });
  }

  obterSala(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
