import { NgModule, provideBrowserGlobalErrorListeners, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

// Layout
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

// Pages
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UtentiComponent } from './pages/utenti/utenti.component';
import { AttivitaComponent } from './pages/attivita/attivita.component';
import { ImpostazioniComponent } from './pages/impostazioni/impostazioni.component';

// Shared
import { StatCardComponent } from './shared/components/stat-card/stat-card.component';
import { ThreejsWidgetComponent } from './shared/components/threejs-widget/threejs-widget.component';

registerLocaleData(localeIt);

@NgModule({
  declarations: [
    App,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    UtentiComponent,
    AttivitaComponent,
    ImpostazioniComponent,
    StatCardComponent,
    ThreejsWidgetComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: LOCALE_ID, useValue: 'it' },
  ],
  bootstrap: [App]
})
export class AppModule { }
