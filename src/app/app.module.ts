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
import { AuthService } from './services/auth.service';
import { IonicStorageModule } from '@ionic/storage';
import { ProjectLeadsComponent } from './components/project-leads/project-leads.component';
import { TeamSettingsComponent } from './components/team-settings/team-settings.component';
import { TeamToolbarComponent } from './components/team-toolbar/team-toolbar.component';
import { LabelTextComponent } from './components/label-text/label-text.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './services/jwt-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    TeamsComponent,
    SimulationComponent,
    SimulationsComponent,
    AccountComponent,
    ProjectLeadsComponent,
    TeamSettingsComponent,
    TeamToolbarComponent,
    LabelTextComponent
    ],
    exports: [  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
