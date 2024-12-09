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

  events = [
    { title: 'Consulta 1', start: new Date('2024-12-09T09:00:00'), end: new Date('2024-12-09T10:30:00') },
    { title: 'Consulta 2', start: new Date('2024-12-09T14:00:00'), end: new Date('2024-12-09T15:00:00') },
    { title: 'Consulta 4', start: new Date('2024-12-10T00:00:00'), end: new Date('2024-12-10T01:00:00') },
    { title: 'Consulta 4', start: new Date('2024-12-10T01:01:00'), end: new Date('2024-12-10T01:30:00') }
  ];
  
  getEventsForDay(day: Date): any[] {
    // Filtra os eventos para retornar os que são no mesmo dia
    return this.events.filter(event => 
      event.start.getDate() === day.getDate() &&
      event.start.getMonth() === day.getMonth() &&
      event.start.getFullYear() === day.getFullYear()
    );
  }

  getEventsForWeek(): any[] {
    const startOfWeek = this.getStartOfWeek(this.currentDate); // Obtém o início da semana
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Último dia da semana (sábado)
  
    // Filtra os eventos que ocorrem na semana
    return this.events.filter(event => 
      event.start >= startOfWeek && event.end <= endOfWeek
    );
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

  getEventPosition(start: Date): string {
    const startHour = start.getHours();
    const startMinutes = start.getMinutes();
    const position = startHour * 60 + startMinutes; // Total de minutos desde meia-noite
    return `${(position / 60) * 40 + 10}px`; // 40px é a altura de cada hora, 10px de espaçamento
  }
  
  // Função para calcular a altura do evento com a duração, incluindo um espaçamento entre eventos
  getEventHeight(start: Date, end: Date): string {
    const durationInMinutes = (end.getTime() - start.getTime()) / (1000 * 60); // Duração em minutos
    return `${(durationInMinutes / 60) * 40 - 5}px`; // Ajusta a altura (40px por hora, -5px para espaçamento)
  }
}
