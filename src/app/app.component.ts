import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule // Apenas o módulo base de roteamento
  ],
  template: `<router-outlet></router-outlet>`, // Ponto onde as rotas serão carregadas
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}
