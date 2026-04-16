import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface Notifica {
  id: number;
  testo: string;
  tempo: string;
  letta: boolean;
  icona: string;
}

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  titoloPagina = 'Dashboard';
  sottotitolo  = 'Panoramica generale del sistema';

  showNotifiche = false;
  showProfilo   = false;

  private paginaMap: { [key: string]: { titolo: string; sottotitolo: string } } = {
    '/dashboard':    { titolo: 'Dashboard',    sottotitolo: 'Panoramica generale del sistema' },
    '/utenti':       { titolo: 'Utenti',        sottotitolo: 'Gestisci gli account utente' },
    '/attivita':     { titolo: 'Attività',      sottotitolo: 'Monitora e gestisci le attività' },
    '/impostazioni': { titolo: 'Impostazioni',  sottotitolo: 'Configura le preferenze del sistema' },
  };

  notifiche: Notifica[] = [
    { id: 1, testo: 'Nuova attività assegnata a te',        tempo: '5 min fa',  letta: false, icona: 'clipboard' },
    { id: 2, testo: 'Utente Davide Ricci si è registrato',  tempo: '1 ora fa',  letta: false, icona: 'user-plus' },
    { id: 3, testo: 'Backup automatico completato',         tempo: '3 ore fa',  letta: false, icona: 'check' },
    { id: 4, testo: 'Aggiornamento sistema v2.4.1',         tempo: '5 ore fa',  letta: true,  icona: 'refresh' },
  ];

  get nonLette(): number { return this.notifiche.filter(n => !n.letta).length; }

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.aggiornaInfo(this.router.url);
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.aggiornaInfo(e.url);
        this.showNotifiche = false;
        this.showProfilo   = false;
        this.cdr.detectChanges();
      });
  }

  private aggiornaInfo(url: string) {
    const p = this.paginaMap[url];
    if (p) { this.titoloPagina = p.titolo; this.sottotitolo = p.sottotitolo; }
  }

  toggleNotifiche() {
    this.showNotifiche = !this.showNotifiche;
    this.showProfilo   = false;
  }

  toggleProfilo() {
    this.showProfilo   = !this.showProfilo;
    this.showNotifiche = false;
  }

  segnaLetta(notifica: Notifica, event: Event) {
    event.stopPropagation();
    notifica.letta = true;
  }

  segnaLettaTutte() {
    this.notifiche.forEach(n => n.letta = true);
  }

  getIconaPath(icona: string): string {
    const m: { [k: string]: string } = {
      'check':    'M5 13l4 4L19 7',
      'clipboard':'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      'user-plus':'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
      'refresh':  'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    };
    return m[icona] || m['check'];
  }

  @HostListener('document:click', ['$event'])
  chiudiDropdown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-anchor')) {
      this.showNotifiche = false;
      this.showProfilo   = false;
    }
  }
}
