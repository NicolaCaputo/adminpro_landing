import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';
import { AttivitaRecente, ChartDataPoint, StatCard } from '../models/analytics.model';
import {
  MOCK_USERS,
  MOCK_TASKS,
  MOCK_STAT_CARDS,
  MOCK_GRAFICO_MENSILE,
  MOCK_ATTIVITA_RECENTI
} from '../data/mock-data';

@Injectable({ providedIn: 'root' })
export class DataService {

  constructor(private ngZone: NgZone) {}

  private fakeAsync<T>(data: T, ms: number): Observable<T> {
    return new Observable<T>(observer => {
      const id = setTimeout(() => {
        this.ngZone.run(() => {
          observer.next(data);
          observer.complete();
        });
      }, ms);
      return () => clearTimeout(id);
    });
  }

  getUtenti(): Observable<User[]> {
    return this.fakeAsync(MOCK_USERS, 600);
  }

  getAttivita(): Observable<Task[]> {
    return this.fakeAsync(MOCK_TASKS, 500);
  }

  getStatCards(): Observable<StatCard[]> {
    return this.fakeAsync(MOCK_STAT_CARDS, 400);
  }

  getGraficoMensile(): Observable<ChartDataPoint[]> {
    return this.fakeAsync(MOCK_GRAFICO_MENSILE, 300);
  }

  getAttivitaRecenti(): Observable<AttivitaRecente[]> {
    return this.fakeAsync(MOCK_ATTIVITA_RECENTI, 450);
  }
}
