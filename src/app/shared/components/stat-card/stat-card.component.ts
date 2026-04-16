import { Component, Input } from '@angular/core';
import { StatCard } from '../../../core/models/analytics.model';

@Component({
  selector: 'app-stat-card',
  standalone: false,
  templateUrl: './stat-card.component.html',
})
export class StatCardComponent {
  @Input() stat!: StatCard;
  @Input() loading = false;

  get variazionePositiva(): boolean { return this.stat?.variazione >= 0; }
  get variazioneAssoluta(): string  { return Math.abs(this.stat?.variazione).toFixed(1); }

  getIconPath(icon: string): string {
    const m: { [k: string]: string } = {
      // Cube — abstract 3D collection for "total users"
      'users':        'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
      // Lightning bolt — energy/momentum for "completed tasks"
      'check-circle': 'M13 10V3L4 14h7v7l9-11h-7z',
      // Coin circle — revenue
      'trending-up':  'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      // Pennant/flag — open tickets
      'alert-circle': 'M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9',
    };
    return m[icon] || m['check-circle'];
  }

  // All icons use the brand blue palette
  getIconBg(color: string)   { return 'rgba(5,84,242,0.08)'; }
  getIconBdr(color: string)  { return 'rgba(5,84,242,0.18)'; }
  getIconText(color: string) {
    const m: { [k: string]: string } = {
      'indigo':  '#0554F2',
      'emerald': '#0b7a4f',
      'violet':  '#0540F2',
      'amber':   '#966200',
    };
    return m[color] || '#0554F2';
  }
}
