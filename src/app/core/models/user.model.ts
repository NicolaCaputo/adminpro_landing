export interface User {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  ruolo: 'Admin' | 'Manager' | 'Utente' | 'Ospite';
  stato: 'Attivo' | 'Inattivo' | 'In Attesa';
  avatar: string;
  dipartimento: string;
  dataIscrizione: string;
  ultimoAccesso: string;
}
