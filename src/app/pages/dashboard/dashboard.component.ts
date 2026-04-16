import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { StatCard, AttivitaRecente, ChartDataPoint } from '../../core/models/analytics.model';
import { Task } from '../../core/models/task.model';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  statCards: StatCard[] = [];
  attivitaRecenti: AttivitaRecente[] = [];
  graficoDati: ChartDataPoint[] = [];
  attivitaInCorso: Task[] = [];
  utentiRecenti: User[] = [];

  loadingStats = true;
  loadingAttivita = true;
  loadingGrafico = true;
  loadingTasks = true;
  loadingUtenti = true;

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dataService.getStatCards().subscribe(data => {
      this.statCards = data; this.loadingStats = false; this.cdr.detectChanges();
    });
    this.dataService.getAttivitaRecenti().subscribe(data => {
      this.attivitaRecenti = data; this.loadingAttivita = false; this.cdr.detectChanges();
    });
    this.dataService.getGraficoMensile().subscribe(data => {
      this.graficoDati = data; this.loadingGrafico = false; this.cdr.detectChanges();
    });
    this.dataService.getAttivita().subscribe(data => {
      this.attivitaInCorso = data.filter(t => t.stato === 'In Corso').slice(0, 4);
      this.loadingTasks = false; this.cdr.detectChanges();
    });
    this.dataService.getUtenti().subscribe(data => {
      this.utentiRecenti = data.filter(u => u.stato === 'Attivo').slice(0, 5);
      this.loadingUtenti = false; this.cdr.detectChanges();
    });
  }

  get maxGrafico(): number { return Math.max(...this.graficoDati.map(d => d.valore), 1); }
  altezzaBarra(v: number): number { return (v / this.maxGrafico) * 100; }

  getPrioritaClass(p: string): string {
    const m: { [k: string]: string } = {
      'Urgente':'badge-danger', 'Alta':'badge-warning', 'Media':'badge-blue', 'Bassa':'badge-neutral'
    };
    return m[p] || 'badge-neutral';
  }

  getIconAttivita(icona: string): string {
    const m: { [k: string]: string } = {
      'check':    'M5 13l4 4L19 7',
      'server':   'M5 12H3m2 0a2 2 0 104 0M5 12a2 2 0 114 0m0 0h6m0 0a2 2 0 104 0m-4 0a2 2 0 114 0m0 0h2',
      'upload':   'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12',
      'clipboard':'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      'user-plus':'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
      'refresh':  'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    };
    return m[icona] || m['check'];
  }

  getAvatarColor(i: number): string {
    const c = [
      'rgba(5,84,242,0.1)|#0554F2',
      'rgba(11,122,79,0.1)|#0b7a4f',
      'rgba(150,98,0,0.1)|#966200',
      'rgba(5,68,242,0.08)|#0540F2',
      'rgba(5,108,242,0.1)|#056CF2',
    ];
    return c[i % c.length];
  }

  getAvatarBg(i: number)   { return this.getAvatarColor(i).split('|')[0]; }
  getAvatarText(i: number) { return this.getAvatarColor(i).split('|')[1]; }
  getAvatarBdr(i: number)  {
    const colors = ['rgba(5,84,242,0.2)','rgba(11,122,79,0.2)','rgba(150,98,0,0.2)','rgba(5,68,242,0.2)','rgba(5,108,242,0.2)'];
    return colors[i % colors.length];
  }
}
