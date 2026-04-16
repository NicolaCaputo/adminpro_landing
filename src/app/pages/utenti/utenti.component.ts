import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-utenti',
  standalone: false,
  templateUrl: './utenti.component.html',
})
export class UtentiComponent implements OnInit {
  utenti: User[] = [];
  utentiFiltrati: User[] = [];
  loading = true;

  filtroRicerca = '';
  filtroRuolo = '';
  filtroStato = '';

  ruoli  = ['Admin', 'Manager', 'Utente', 'Ospite'];
  stati  = ['Attivo', 'Inattivo', 'In Attesa'];

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dataService.getUtenti().subscribe(data => {
      this.utenti = data;
      this.utentiFiltrati = data;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  filtra(): void {
    this.utentiFiltrati = this.utenti.filter(u => {
      const s = `${u.nome} ${u.cognome} ${u.email}`.toLowerCase();
      return (!this.filtroRicerca || s.includes(this.filtroRicerca.toLowerCase()))
          && (!this.filtroRuolo  || u.ruolo  === this.filtroRuolo)
          && (!this.filtroStato  || u.stato  === this.filtroStato);
    });
  }

  resetFiltri(): void {
    this.filtroRicerca = '';
    this.filtroRuolo   = '';
    this.filtroStato   = '';
    this.utentiFiltrati = [...this.utenti];
  }

  getStatoClass(stato: string): string {
    const map: { [key: string]: string } = {
      'Attivo':    'badge-success',
      'Inattivo':  'badge-neutral',
      'In Attesa': 'badge-warning',
    };
    return map[stato] || 'badge-neutral';
  }

  getRuoloClass(ruolo: string): string {
    const map: { [key: string]: string } = {
      'Admin':   'badge-danger',
      'Manager': 'badge-warning',
      'Utente':  'badge-blue',
      'Ospite':  'badge-neutral',
    };
    return map[ruolo] || 'badge-neutral';
  }

  getAvatarColor(index: number): string {
    const c = [
      'rgba(5,84,242,0.1)|#0554F2',
      'rgba(11,122,79,0.1)|#0b7a4f',
      'rgba(150,98,0,0.1)|#966200',
      'rgba(5,68,242,0.08)|#0540F2',
      'rgba(5,108,242,0.1)|#056CF2',
    ];
    return c[index % c.length];
  }
  getAvatarBg(i: number)   { return this.getAvatarColor(i).split('|')[0]; }
  getAvatarText(i: number) { return this.getAvatarColor(i).split('|')[1]; }
  getAvatarBdr(i: number)  {
    const colors = ['rgba(5,84,242,0.2)','rgba(11,122,79,0.2)','rgba(150,98,0,0.2)','rgba(5,68,242,0.2)','rgba(5,108,242,0.2)'];
    return colors[i % colors.length];
  }

  get totaleAttivi(): number  { return this.utenti.filter(u => u.stato === 'Attivo').length; }
  get totaleAdmin():  number  { return this.utenti.filter(u => u.ruolo  === 'Admin').length; }
}
