import { Component } from '@angular/core';

@Component({
  selector: 'app-google-calendar',
  templateUrl: './google-calendar.component.html',
  styleUrls: ['./google-calendar.component.css']
})
export class GoogleCalendarComponent {
  calendarUrl: string = "https://calendar.google.com/calendar/embed?src=tiagocampos2212%40gmail.com&ctz=Europe%2FLisbon";

  changeCalendar(newCalendarId: string): void {
    this.calendarUrl = `https://calendar.google.com/calendar/embed?src=${newCalendarId}&ctz=Europe%2FLisbon`;
  }
}
