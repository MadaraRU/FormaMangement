import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BtpComponent } from './btp/btp.component';
import { BtsComponent } from './bts/bts.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'Accueil',
    component: HomeComponent
  },
  {
    path: 'Contactez-nous',
    component: ContactUsComponent
  },
  {
    path: 'btp',
    component: BtpComponent
  },
  {
    path: 'bts',
    component: BtsComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: '/Accueil',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/Accueil',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
