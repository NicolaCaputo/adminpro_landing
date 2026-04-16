import { User } from '../models/user.model';
import { Task } from '../models/task.model';
import { AttivitaRecente, ChartDataPoint, StatCard } from '../models/analytics.model';

export const MOCK_USERS: User[] = [
  { id: 1, nome: 'Marco', cognome: 'Rossi', email: 'marco.rossi@azienda.it', ruolo: 'Admin', stato: 'Attivo', avatar: 'MR', dipartimento: 'Tecnologia', dataIscrizione: '2023-01-15', ultimoAccesso: '2026-04-16' },
  { id: 2, nome: 'Giulia', cognome: 'Bianchi', email: 'giulia.bianchi@azienda.it', ruolo: 'Manager', stato: 'Attivo', avatar: 'GB', dipartimento: 'Marketing', dataIscrizione: '2023-03-22', ultimoAccesso: '2026-04-15' },
  { id: 3, nome: 'Luca', cognome: 'Ferrari', email: 'luca.ferrari@azienda.it', ruolo: 'Utente', stato: 'Attivo', avatar: 'LF', dipartimento: 'Sviluppo', dataIscrizione: '2023-06-10', ultimoAccesso: '2026-04-14' },
  { id: 4, nome: 'Sofia', cognome: 'Esposito', email: 'sofia.esposito@azienda.it', ruolo: 'Manager', stato: 'Inattivo', avatar: 'SE', dipartimento: 'Vendite', dataIscrizione: '2023-02-28', ultimoAccesso: '2026-03-20' },
  { id: 5, nome: 'Andrea', cognome: 'Romano', email: 'andrea.romano@azienda.it', ruolo: 'Utente', stato: 'Attivo', avatar: 'AR', dipartimento: 'Sviluppo', dataIscrizione: '2023-08-05', ultimoAccesso: '2026-04-16' },
  { id: 6, nome: 'Chiara', cognome: 'Conti', email: 'chiara.conti@azienda.it', ruolo: 'Utente', stato: 'In Attesa', avatar: 'CC', dipartimento: 'Design', dataIscrizione: '2024-01-12', ultimoAccesso: '2026-04-10' },
  { id: 7, nome: 'Davide', cognome: 'Ricci', email: 'davide.ricci@azienda.it', ruolo: 'Ospite', stato: 'Attivo', avatar: 'DR', dipartimento: 'Supporto', dataIscrizione: '2024-03-18', ultimoAccesso: '2026-04-12' },
  { id: 8, nome: 'Valentina', cognome: 'Marino', email: 'valentina.marino@azienda.it', ruolo: 'Manager', stato: 'Attivo', avatar: 'VM', dipartimento: 'Risorse Umane', dataIscrizione: '2023-05-07', ultimoAccesso: '2026-04-16' },
  { id: 9, nome: 'Francesco', cognome: 'Greco', email: 'francesco.greco@azienda.it', ruolo: 'Utente', stato: 'Attivo', avatar: 'FG', dipartimento: 'Sviluppo', dataIscrizione: '2023-09-14', ultimoAccesso: '2026-04-13' },
  { id: 10, nome: 'Elena', cognome: 'Colombo', email: 'elena.colombo@azienda.it', ruolo: 'Admin', stato: 'Attivo', avatar: 'EC', dipartimento: 'Tecnologia', dataIscrizione: '2022-11-30', ultimoAccesso: '2026-04-16' },
  { id: 11, nome: 'Matteo', cognome: 'Fontana', email: 'matteo.fontana@azienda.it', ruolo: 'Utente', stato: 'Inattivo', avatar: 'MF', dipartimento: 'Marketing', dataIscrizione: '2024-02-20', ultimoAccesso: '2026-02-28' },
  { id: 12, nome: 'Alessia', cognome: 'Moretti', email: 'alessia.moretti@azienda.it', ruolo: 'Utente', stato: 'Attivo', avatar: 'AM', dipartimento: 'Design', dataIscrizione: '2023-11-08', ultimoAccesso: '2026-04-15' },
];

export const MOCK_TASKS: Task[] = [
  { id: 1, titolo: 'Ridisegnare interfaccia utente', descrizione: 'Aggiornare la UI del pannello di controllo con le nuove linee guida del brand', stato: 'In Corso', priorita: 'Alta', assegnatoA: 'Chiara Conti', assegnatoAvatar: 'CC', progetto: 'Redesign UI', scadenza: '2026-04-25', creata: '2026-04-01', tag: ['Design', 'UI/UX'] },
  { id: 2, titolo: 'Migrazione database PostgreSQL', descrizione: 'Migrare tutti i dati dal vecchio sistema al nuovo cluster PostgreSQL', stato: 'Da Fare', priorita: 'Urgente', assegnatoA: 'Luca Ferrari', assegnatoAvatar: 'LF', progetto: 'Infrastruttura', scadenza: '2026-04-20', creata: '2026-04-05', tag: ['Backend', 'Database'] },
  { id: 3, titolo: 'Implementare autenticazione 2FA', descrizione: 'Aggiungere autenticazione a due fattori per tutti gli account admin', stato: 'Completata', priorita: 'Alta', assegnatoA: 'Marco Rossi', assegnatoAvatar: 'MR', progetto: 'Sicurezza', scadenza: '2026-04-10', creata: '2026-03-20', tag: ['Sicurezza', 'Backend'] },
  { id: 4, titolo: 'Campagna email Q2 2026', descrizione: 'Pianificare e sviluppare la campagna email per il secondo trimestre', stato: 'In Corso', priorita: 'Media', assegnatoA: 'Giulia Bianchi', assegnatoAvatar: 'GB', progetto: 'Marketing', scadenza: '2026-05-01', creata: '2026-04-08', tag: ['Marketing', 'Email'] },
  { id: 5, titolo: 'Ottimizzazione performance API', descrizione: 'Ridurre i tempi di risposta delle API critiche del 40%', stato: 'In Corso', priorita: 'Alta', assegnatoA: 'Francesco Greco', assegnatoAvatar: 'FG', progetto: 'Performance', scadenza: '2026-04-30', creata: '2026-04-02', tag: ['Backend', 'Performance'] },
  { id: 6, titolo: 'Documentazione API v2', descrizione: 'Scrivere la documentazione completa per la versione 2 delle API', stato: 'Da Fare', priorita: 'Bassa', assegnatoA: 'Andrea Romano', assegnatoAvatar: 'AR', progetto: 'Documentazione', scadenza: '2026-05-15', creata: '2026-04-10', tag: ['Documentazione', 'API'] },
  { id: 7, titolo: 'Formazione nuovi dipendenti', descrizione: 'Organizzare sessioni di onboarding per i nuovi assunti del trimestre', stato: 'In Corso', priorita: 'Media', assegnatoA: 'Valentina Marino', assegnatoAvatar: 'VM', progetto: 'HR', scadenza: '2026-04-22', creata: '2026-04-06', tag: ['HR', 'Formazione'] },
  { id: 8, titolo: 'Integrazione Stripe pagamenti', descrizione: 'Integrare il sistema di pagamento Stripe nel portale clienti', stato: 'Da Fare', priorita: 'Alta', assegnatoA: 'Luca Ferrari', assegnatoAvatar: 'LF', progetto: 'E-commerce', scadenza: '2026-05-10', creata: '2026-04-11', tag: ['Backend', 'Pagamenti'] },
  { id: 9, titolo: 'Analisi competitor Q1', descrizione: 'Report dettagliato sull\'analisi dei competitor nel settore', stato: 'Completata', priorita: 'Media', assegnatoA: 'Giulia Bianchi', assegnatoAvatar: 'GB', progetto: 'Strategia', scadenza: '2026-04-01', creata: '2026-03-15', tag: ['Analisi', 'Strategia'] },
  { id: 10, titolo: 'Test di sicurezza penetrazione', descrizione: 'Eseguire test di penetrazione sull\'infrastruttura principale', stato: 'Annullata', priorita: 'Alta', assegnatoA: 'Elena Colombo', assegnatoAvatar: 'EC', progetto: 'Sicurezza', scadenza: '2026-04-15', creata: '2026-03-25', tag: ['Sicurezza'] },
  { id: 11, titolo: 'Dashboard mobile responsiva', descrizione: 'Rendere la dashboard completamente responsive su dispositivi mobile', stato: 'In Corso', priorita: 'Media', assegnatoA: 'Chiara Conti', assegnatoAvatar: 'CC', progetto: 'Redesign UI', scadenza: '2026-05-05', creata: '2026-04-09', tag: ['Mobile', 'Frontend'] },
  { id: 12, titolo: 'Setup pipeline CI/CD', descrizione: 'Configurare pipeline di integrazione e distribuzione continua con GitHub Actions', stato: 'Completata', priorita: 'Alta', assegnatoA: 'Andrea Romano', assegnatoAvatar: 'AR', progetto: 'DevOps', scadenza: '2026-04-08', creata: '2026-03-28', tag: ['DevOps', 'CI/CD'] },
];

export const MOCK_STAT_CARDS: StatCard[] = [
  { titolo: 'Utenti Totali', valore: 2847, variazione: 12.5, icona: 'users', colore: 'indigo' },
  { titolo: 'Attività Completate', valore: 384, variazione: 8.2, icona: 'check-circle', colore: 'emerald' },
  { titolo: 'Ricavi Mensili', valore: '€ 48.250', variazione: -2.4, icona: 'trending-up', colore: 'violet' },
  { titolo: 'Ticket Aperti', valore: 27, variazione: -15.3, icona: 'alert-circle', colore: 'amber' },
];

export const MOCK_GRAFICO_MENSILE: ChartDataPoint[] = [
  { etichetta: 'Gen', valore: 4200 },
  { etichetta: 'Feb', valore: 5800 },
  { etichetta: 'Mar', valore: 4900 },
  { etichetta: 'Apr', valore: 7200 },
  { etichetta: 'Mag', valore: 6100 },
  { etichetta: 'Giu', valore: 8400 },
  { etichetta: 'Lug', valore: 7800 },
  { etichetta: 'Ago', valore: 6500 },
  { etichetta: 'Set', valore: 9100 },
  { etichetta: 'Ott', valore: 8700 },
  { etichetta: 'Nov', valore: 11200 },
  { etichetta: 'Dic', valore: 10400 },
];

export const MOCK_ATTIVITA_RECENTI: AttivitaRecente[] = [
  { id: 1, tipo: 'utente', messaggio: 'Marco Rossi ha completato "Implementare autenticazione 2FA"', tempo: '5 min fa', icona: 'check', colore: 'emerald' },
  { id: 2, tipo: 'sistema', messaggio: 'Backup automatico completato con successo', tempo: '23 min fa', icona: 'server', colore: 'indigo' },
  { id: 3, tipo: 'utente', messaggio: 'Giulia Bianchi ha caricato un nuovo report di marketing', tempo: '1 ora fa', icona: 'upload', colore: 'violet' },
  { id: 4, tipo: 'attivita', messaggio: 'Nuova attività assegnata a Francesco Greco', tempo: '2 ore fa', icona: 'clipboard', colore: 'amber' },
  { id: 5, tipo: 'utente', messaggio: 'Nuovo utente registrato: Davide Ricci', tempo: '3 ore fa', icona: 'user-plus', colore: 'blue' },
  { id: 6, tipo: 'sistema', messaggio: 'Aggiornamento di sistema v2.4.1 installato', tempo: '5 ore fa', icona: 'refresh', colore: 'slate' },
];
