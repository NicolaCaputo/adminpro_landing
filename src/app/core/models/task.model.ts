export interface Task {
  id: number;
  titolo: string;
  descrizione: string;
  stato: 'Da Fare' | 'In Corso' | 'Completata' | 'Annullata';
  priorita: 'Bassa' | 'Media' | 'Alta' | 'Urgente';
  assegnatoA: string;
  assegnatoAvatar: string;
  progetto: string;
  scadenza: string;
  creata: string;
  tag: string[];
}
