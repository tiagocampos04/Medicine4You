import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-calendar',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentDate: Date = new Date(); // Data atual
  viewMode: 'Dia' | 'Semana' | 'Mês' = 'Mês'; // Modo de exibição
  daysInMonth: Date[] = []; // Dias no mês
  daysInWeek: Date[] = []; // Dias na semana
  selectedDate: Date = new Date(); // Data selecionada

  ngOnInit(): void {
    this.generateMonthView(); // Gera a visualização do mês ao iniciar
    this.generateWeekView(); // Gera a visualização da semana
  }

  // Gera os dias para a visualização mensal
  generateMonthView(): void {
    const start = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const end = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
  
    // Encontra o primeiro domingo antes ou no início do mês
    const startOfCalendar = new Date(start);
    startOfCalendar.setDate(start.getDate() - start.getDay());
  
    // Encontra o último sábado após ou no final do mês
    const endOfCalendar = new Date(end);
    endOfCalendar.setDate(end.getDate() + (6 - end.getDay()));
  
    // Gera os dias do calendário
    this.daysInMonth = [];
    let currentDay = new Date(startOfCalendar);
  
    while (currentDay <= endOfCalendar) {
      this.daysInMonth.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
  }

  // Gera os dias para a visualização semanal
  generateWeekView(): void {
    const startOfWeek = this.getStartOfWeek(this.currentDate);
    this.daysInWeek = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      this.daysInWeek.push(day);
    }
  }

  // Pega o início da semana (domingo)
  getStartOfWeek(date: Date): Date {
    const start = new Date(date);
    const dayOfWeek = start.getDay();
    start.setDate(start.getDate() - dayOfWeek);
    return start;
  }

  // Muda a visualização
  setViewMode(mode: 'Dia' | 'Semana' | 'Mês'): void {
    this.viewMode = mode;
  }

  // Navegar entre dias, semanas ou meses
  navigate(direction: 'prev' | 'next'): void {
    if (this.viewMode === 'Dia') {
      this.currentDate.setDate(this.currentDate.getDate() + (direction === 'prev' ? -1 : 1));
    } else if (this.viewMode === 'Semana') {
      this.currentDate.setDate(this.currentDate.getDate() + (direction === 'prev' ? -7 : 7));
    } else if (this.viewMode === 'Mês') {
      this.currentDate.setMonth(this.currentDate.getMonth() + (direction === 'prev' ? -1 : 1));
    }

    this.currentDate = new Date(this.currentDate);
    this.generateMonthView();
    this.generateWeekView();
  }

  // Seleciona uma data (usada na visualização diária)
  selectDate(date: Date): void {
    this.selectedDate = date;
    this.viewMode = 'Dia';
  }
}