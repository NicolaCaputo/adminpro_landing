export interface StatCard {
  titolo: string;
  valore: string | number;
  variazione: number;
  icona: string;
  colore: string;
  prefisso?: string;
  suffisso?: string;
}

export interface ChartDataPoint {
  etichetta: string;
  valore: number;
}

export interface AttivitaRecente {
  id: number;
  tipo: 'utente' | 'attivita' | 'sistema';
  messaggio: string;
  tempo: string;
  icona: string;
  colore: string;
}
