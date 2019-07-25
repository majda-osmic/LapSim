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

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    SimulationComponent,
    SimulationsComponent,
    AccountComponent,
    ],
    exports: [  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
