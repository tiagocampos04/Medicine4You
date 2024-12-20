import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdministradorService {
  private apiUrl = 'https://localhost:7029/Medicine4You/ControladorAdministrador/ListaAdministrador'; // Substitua pela URL real da API

  constructor(private http: HttpClient) {}

  // Método para obter todos os administradores
  getAdministradores(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Recupera o token do localStorage
    

    if (!token) {
      throw new Error('Token não encontrado');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
