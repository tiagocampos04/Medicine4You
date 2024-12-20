import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7029/Medicine4You/ControladorAdministrador'; 

  constructor(private http: HttpClient, private router: Router) {}
  
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ConectarAdministrador`, credentials);
  }


  // Método para salvar o token no localStorage
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Método para recuperar o token do localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Método para logout
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
