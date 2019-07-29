import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SimulationComponent } from './components/simulation/simulation.component';
import { AccountComponent } from './components/account/account.component';
import { TeamComponent } from './components/team/team.component';
import { FormsModule } from '@angular/forms';
import { SimulationsComponent } from './components/simulations/simulations.component';
import { TeamsComponent } from './components/teams/teams.component';
import { UserData } from './providers/user-data';
import { IonicStorageModule } from '@ionic/storage';
import { ProjectLeadsComponent } from './components/project-leads/project-leads.component';


@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    TeamsComponent,
    SimulationComponent,
    SimulationsComponent,
    AccountComponent,
    ProjectLeadsComponent
    ],
    exports: [  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserData,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
