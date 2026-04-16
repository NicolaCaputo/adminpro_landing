import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

export interface NavItem {
  route: string;
  label: string;
  exact?: boolean;
  color: string;
  colorBg: string;
  colorBdr: string;
  colorActiveBg: string;
  colorActiveBdr: string;
  iconPath: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  showUserMenu = false;

  menuItems: NavItem[] = [
    {
      route: '/dashboard', label: 'Dashboard', exact: true,
      color: '#82c8f0',
      colorBg: 'rgba(80,170,230,0.32)', colorBdr: 'rgba(80,170,230,0.55)',
      colorActiveBg: 'rgba(80,170,230,0.42)', colorActiveBdr: 'rgba(80,170,230,0.68)',
      iconPath: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
    },
    {
      route: '/utenti', label: 'Utenti',
      color: '#2dd4a0',
      colorBg: 'rgba(11,160,110,0.35)', colorBdr: 'rgba(11,160,110,0.55)',
      colorActiveBg: 'rgba(11,160,110,0.42)', colorActiveBdr: 'rgba(11,160,110,0.65)',
      iconPath: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
    },
    {
      route: '/attivita', label: 'Attività',
      color: '#f0a830',
      colorBg: 'rgba(196,124,8,0.38)', colorBdr: 'rgba(196,124,8,0.6)',
      colorActiveBg: 'rgba(196,124,8,0.45)', colorActiveBdr: 'rgba(196,124,8,0.68)',
      iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
    },
  ];

  sistemaItems: NavItem[] = [
    {
      route: '/impostazioni', label: 'Impostazioni',
      color: '#c4a0ff',
      colorBg: 'rgba(155,110,247,0.35)', colorBdr: 'rgba(155,110,247,0.55)',
      colorActiveBg: 'rgba(155,110,247,0.42)', colorActiveBdr: 'rgba(155,110,247,0.65)',
      iconPath: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
    },
  ];

  constructor(public router: Router) {}

  isActive(route: string, exact = false): boolean {
    return exact ? this.router.url === route : this.router.url.startsWith(route);
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  @HostListener('document:click', ['$event'])
  chiudiMenu(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.user-menu-anchor')) {
      this.showUserMenu = false;
    }
  }
}
