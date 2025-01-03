import { Component, OnInit } from '@angular/core';
import { ExamesService } from '../services/exames.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prescricao',
  imports: [CommonModule, FormsModule],
  templateUrl: './prescricao.component.html',
  styleUrls: ['./prescricao.component.css'],
})
export class PrescricaoComponent implements OnInit {
  examesDisponiveis: any[] = []; // Lista de exames carregados
  examesSelecionados: any[] = []; // Lista de exames selecionados com opções (checkboxes)

  constructor(private examesService: ExamesService) {}

  ngOnInit(): void {
    this.carregarExames();
  }

  carregarExames(): void {
    // Carrega os exames a partir do serviço (simulando uma resposta com dados)
    this.examesService.getExames().subscribe((data) => {
      this.examesDisponiveis = data;
    });
  }

  onExameChange(index: number): void {
    console.log('Exame selecionado no select', index, ':', this.examesSelecionados[index]);
  }

  adicionarSelect(): void {
    // Adiciona um novo exame selecionado com as opções dos checkboxes
    this.examesSelecionados.push({
      cod_sns: null, // Inicializa com um valor nulo
      mesmoDia: false, // Valor padrão para "No mesmo dia"
      antesConsulta: false, // Valor padrão para "Antes da consulta"
    });
  }
}
