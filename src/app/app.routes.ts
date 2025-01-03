import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GoogleCalendarComponent } from './google-calendar/google-calendar.component';
import { AdministradorListComponent } from './components/administrador-list/administrador-list.component';
import { PrescricaoComponent } from './prescricao/prescricao.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  
  { path: 'login', component: LoginComponent },         
  { path: 'administradores', component: AdministradorListComponent },
  { path: 'calendario', component: GoogleCalendarComponent },
  { path: 'prescricao', component: PrescricaoComponent },
];
