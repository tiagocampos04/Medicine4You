import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administrador-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administrador-list.component.html',
  styleUrls: ['./administrador-list.component.css'],
})
export class AdministradorListComponent implements OnInit {
  administradores: any[] = []; // Array para armazenar os administradores

  constructor(private administradorService: AdministradorService) {}

  ngOnInit(): void {
    // Passa o token ao chamar o serviço
    this.administradorService.getAdministradores().subscribe({
      next: (data) => {
        this.administradores = data;
      },
      error: (err) => {
        console.error('Erro ao carregar administradores:', err);
      },
    });
  }
}
