import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GoogleCalendar } from './google-calendar/google-calendar.component';
import { AdministradorListComponent } from './components/administrador-list/administrador-list.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  
  { path: 'login', component: LoginComponent },         
  { path: 'administradores', component: AdministradorListComponent },
  { path: 'calendario', component: GoogleCalendar },
];
