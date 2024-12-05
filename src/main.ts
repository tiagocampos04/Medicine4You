import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router'; // Importa provideRouter para configurar as rotas
import { routes } from './app/app.routes'; // Importa as rotas definidas

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes) // Adiciona a configuração das rotas
  ],
}).catch((err) => console.error(err));
