import { Injectable } from '@angular/core';

declare var gapi: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleCalendarService {
  private CLIENT_ID = '54399510107-257aktgfcv3q7thbc5o811k3j1cnvose.apps.googleusercontent.com';
  private API_KEY = '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';
  private DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  private SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

  constructor() {
    this.initClient();
  }

  initClient() {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: this.API_KEY,
        clientId: this.CLIENT_ID,
        discoveryDocs: this.DISCOVERY_DOCS,
        scope: this.SCOPES,
      });
    });
  }

  signIn() {
    return gapi.auth2.getAuthInstance().signIn();
  }

  signOut() {
    return gapi.auth2.getAuthInstance().signOut();
  }

  listUpcomingEvents() {
    return gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime',
    });
  }
}
