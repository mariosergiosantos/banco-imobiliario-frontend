import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PropriedadeService {
  private readonly apiUrl = 'http://localhost:8080/api/v1';

  constructor(private readonly http: HttpClient) {}

  listarPropriedades(salaId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/salas/${salaId}/propriedades`);
  }

  transferirPropriedade(propriedadeId: string, novoDonoId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/propriedades/${propriedadeId}/transferir`, { novoDonoId });
  }
}

