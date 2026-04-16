import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UtentiComponent } from './pages/utenti/utenti.component';
import { AttivitaComponent } from './pages/attivita/attivita.component';
import { ImpostazioniComponent } from './pages/impostazioni/impostazioni.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'utenti', component: UtentiComponent },
  { path: 'attivita', component: AttivitaComponent },
  { path: 'impostazioni', component: ImpostazioniComponent },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
