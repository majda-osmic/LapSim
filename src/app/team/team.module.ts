import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TeamPage } from './team.page';
import { SimulationComponent } from '../components/simulation/simulation.component';
import { AccountComponent } from '../components/account/account.component';

const routes: Routes = [
  {
    path: '',
    component: TeamPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    SimulationComponent,
    AccountComponent
  ],
  declarations: [TeamPage, SimulationComponent, AccountComponent]
})
export class TeamPageModule {}
