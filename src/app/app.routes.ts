import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdministradorListComponent } from './components/administrador-list/administrador-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redireciona a rota inicial para '/login'
  { path: 'login', component: LoginComponent },          // Tela de login
  { path: 'administradores', component: AdministradorListComponent }, // Lista de administradores
];
