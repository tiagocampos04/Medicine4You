import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = {
    email_administrador: '',
    senha_administrador: '',
  };

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido!', response);
        localStorage.setItem('token', response.token);  
        console.log('Token armazenado no localStorage:', localStorage.getItem('token'));
        this.router.navigate(['/administradores']);
      },
      error: (err) => {
        console.error('Erro ao fazer login', err);
        alert('Erro ao fazer login. Verifique suas credenciais.');
      },
    });
  }
}
