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
  hoursInDay: string[] = []; // Horas no dia
  selectedDate: Date = new Date(); // Data selecionada

  ngOnInit(): void {
    this.generateMonthView(); // Gera a visualização do mês ao iniciar
    this.generateWeekView(); // Gera a visualização da semana
    this.generateHours(); // Gera a lista de horas do dia
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

  // Gera a lista de horas do dia (00:00 - 23:00)
  generateHours(): void {
    this.hoursInDay = Array.from({ length: 24 }, (_, i) => 
      `${i.toString().padStart(2, '0')}:00`
    );
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

  navigate(direction: 'prev' | 'next'): void {
    if (this.viewMode === 'Dia') {
      this.selectedDate.setDate(this.selectedDate.getDate() + (direction === 'prev' ? -1 : 1));
      this.selectedDate = new Date(this.selectedDate);

     // Atualiza a referência
    } else if (this.viewMode === 'Semana') {
      this.currentDate.setDate(this.currentDate.getDate() + (direction === 'prev' ? -7 : 7));
      this.currentDate = new Date(this.currentDate); // Atualiza a referência
      this.generateWeekView();
    } else if (this.viewMode === 'Mês') {
      this.currentDate.setMonth(this.currentDate.getMonth() + (direction === 'prev' ? -1 : 1));
      this.currentDate = new Date(this.currentDate); // Atualiza a referência
      this.generateMonthView(); // Regenera o mês
    }
  }
  // Seleciona uma data (usada na visualização diária)
  selectDate(date: Date): void {
    this.selectedDate = date;
    this.viewMode = 'Dia';
  }

  getFirstDayOfWeek(): Date {
    const date = new Date(this.currentDate);
    const dayOfWeek = date.getDay(); // 0 para domingo, 6 para sábado
    const diff = dayOfWeek === 0 ? 0 : -dayOfWeek; // Diferença para chegar ao início da semana
    date.setDate(date.getDate() + diff); // Ajusta para o primeiro dia da semana
    return date;
  }
  
  // Retorna o último dia da semana (sábado)
  getLastDayOfWeek(): Date {
    const date = new Date(this.currentDate);
    const dayOfWeek = date.getDay(); // 0 para domingo, 6 para sábado
    const diff = dayOfWeek === 0 ? 6 : 6 - dayOfWeek; // Diferença para chegar ao final da semana
    date.setDate(date.getDate() + diff); // Ajusta para o último dia da semana
    return date;
  }
}
