import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-attivita',
  standalone: false,
  templateUrl: './attivita.component.html',
})
export class AttivitaComponent implements OnInit {
  attivita: Task[] = [];
  attivitaFiltrate: Task[] = [];
  loading = true;

  filtroRicerca = '';
  filtroStato   = '';
  filtroPriorita= '';

  stati    = ['Da Fare', 'In Corso', 'Completata', 'Annullata'];
  priorita = ['Bassa', 'Media', 'Alta', 'Urgente'];

  // Modale Nuova Attività
  mostraleModale = false;
  nuovaAttivita: {
    titolo: string; descrizione: string; assegnatoA: string;
    progetto: string; scadenza: string;
    stato: Task['stato']; priorita: Task['priorita']; tagInput: string;
  } = this.attivitaVuota();

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dataService.getAttivita().subscribe(data => {
      this.attivita = data;
      this.attivitaFiltrate = data;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  private attivitaVuota() {
    return { titolo: '', descrizione: '', assegnatoA: '', progetto: '',
             scadenza: '', stato: 'Da Fare' as Task['stato'],
             priorita: 'Media' as Task['priorita'], tagInput: '' };
  }

  apriModale(): void  { this.mostraleModale = true; }
  chiudiModale(): void { this.mostraleModale = false; this.nuovaAttivita = this.attivitaVuota(); }

  salvaAttivita(): void {
    if (!this.nuovaAttivita.titolo.trim()) return;
    const avatar = this.nuovaAttivita.assegnatoA
      .split(' ').map(p => p[0]?.toUpperCase() ?? '').slice(0, 2).join('') || '??';
    const nuova: Task = {
      id: Date.now(),
      titolo: this.nuovaAttivita.titolo.trim(),
      descrizione: this.nuovaAttivita.descrizione.trim(),
      assegnatoA: this.nuovaAttivita.assegnatoA.trim() || 'Non assegnato',
      assegnatoAvatar: avatar,
      progetto: this.nuovaAttivita.progetto.trim() || '—',
      scadenza: this.nuovaAttivita.scadenza || new Date().toISOString().split('T')[0],
      creata: new Date().toISOString().split('T')[0],
      stato: this.nuovaAttivita.stato,
      priorita: this.nuovaAttivita.priorita,
      tag: this.nuovaAttivita.tagInput
        .split(',').map(t => t.trim()).filter(t => t.length > 0),
    };
    this.attivita = [...this.attivita, nuova];
    this.filtra();
    this.chiudiModale();
  }

  filtra(): void {
    this.attivitaFiltrate = this.attivita.filter(a => {
      const s = `${a.titolo} ${a.descrizione} ${a.assegnatoA}`.toLowerCase();
      return (!this.filtroRicerca  || s.includes(this.filtroRicerca.toLowerCase()))
          && (!this.filtroStato    || a.stato    === this.filtroStato)
          && (!this.filtroPriorita || a.priorita === this.filtroPriorita);
    });
  }

  resetFiltri(): void {
    this.filtroRicerca  = '';
    this.filtroStato    = '';
    this.filtroPriorita = '';
    this.attivitaFiltrate = [...this.attivita];
  }

  getStatoClass(stato: string): string {
    const map: { [key: string]: string } = {
      'Da Fare':   'badge-neutral',
      'In Corso':  'badge-blue',
      'Completata':'badge-success',
      'Annullata': 'badge-danger',
    };
    return map[stato] || 'badge-neutral';
  }

  getPrioritaClass(priorita: string): string {
    const map: { [key: string]: string } = {
      'Urgente': 'badge-danger',
      'Alta':    'badge-warning',
      'Media':   'badge-blue',
      'Bassa':   'badge-neutral',
    };
    return map[priorita] || 'badge-neutral';
  }

  getPrioritaArrow(priorita: string): string {
    const map: { [key: string]: string } = {
      'Urgente': 'M5 11l7-7 7 7M5 19l7-7 7 7',    // double up chevron
      'Alta':    'M5 15l7-7 7 7',                   // single up chevron
      'Media':   'M17 8l4 4m0 0l-4 4m4-4H3',       // right arrow
      'Bassa':   'M19 9l-7 7-7-7',                  // down chevron
    };
    return map[priorita] || map['Media'];
  }

  getPrioritaDotColor(priorita: string): string {
    const map: { [key: string]: string } = {
      'Urgente': '#c21f1f',
      'Alta':    '#966200',
      'Media':   '#0554F2',
      'Bassa':   'rgba(64,37,22,0.25)',
    };
    return map[priorita] || 'rgba(64,37,22,0.25)';
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

  contaPerStato(stato: string): number {
    return this.attivita.filter(a => a.stato === stato).length;
  }

  isScaduta(scadenza: string): boolean {
    return new Date(scadenza) < new Date();
  }
}
