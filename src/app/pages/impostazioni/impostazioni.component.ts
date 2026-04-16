import { Component } from '@angular/core';

interface NotificheConfig {
  [key: string]: boolean;
  emailAttivita: boolean;
  emailReport: boolean;
  emailSistema: boolean;
  pushBrowser: boolean;
  pushMobile: boolean;
  riepilogoSettimanale: boolean;
}

@Component({
  selector: 'app-impostazioni',
  standalone: false,
  templateUrl: './impostazioni.component.html',
})
export class ImpostazioniComponent {
  sezioneAttiva = 'profilo';

  sezioni = [
    { id: 'profilo', label: 'Profilo', icona: 'user' },
    { id: 'sicurezza', label: 'Sicurezza', icona: 'shield' },
    { id: 'notifiche', label: 'Notifiche', icona: 'bell' },
    { id: 'sistema', label: 'Sistema', icona: 'server' },
  ];

  profilo = {
    nome: 'Nicola',
    cognome: 'Caputo',
    email: 'nico.caput14@gmail.com',
    ruolo: 'Amministratore',
    dipartimento: 'Tecnologia',
    lingua: 'Italiano',
    fuso: 'Europe/Rome',
  };

  notifiche: NotificheConfig = {
    emailAttivita: true,
    emailReport: true,
    emailSistema: false,
    pushBrowser: true,
    pushMobile: false,
    riepilogoSettimanale: true,
  };

  notificheItems = [
    { key: 'emailAttivita', label: 'Notifiche attività', desc: "Quando un'attività viene assegnata o completata" },
    { key: 'emailReport', label: 'Report settimanale', desc: 'Riepilogo delle metriche ogni lunedì' },
    { key: 'emailSistema', label: 'Avvisi di sistema', desc: 'Aggiornamenti critici del sistema' },
  ];

  sistema = {
    tema: 'chiaro',
    compattezza: 'normale',
    animazioni: true,
    sessione: '60',
  };

  salvatoSuccesso = false;

  salva(): void {
    this.salvatoSuccesso = true;
    setTimeout(() => this.salvatoSuccesso = false, 3000);
  }

  getNotificaValore(key: string): boolean {
    return this.notifiche[key];
  }

  toggleNotifica(key: string): void {
    this.notifiche[key] = !this.notifiche[key];
  }

  getIconPath(icon: string): string {
    const icons: { [key: string]: string } = {
      'user': 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      'shield': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      'bell': 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
      'server': 'M5 12H3m2 0a2 2 0 104 0M5 12a2 2 0 114 0m0 0h6m0 0a2 2 0 104 0m-4 0a2 2 0 114 0m0 0h2',
    };
    return icons[icon] || icons['user'];
  }
}
