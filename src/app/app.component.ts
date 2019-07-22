import { Component } from '@angular/core';

import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ITeam } from './data-interfaces';
import { TeamsService } from './services/teams.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  teams: ITeam[];


  constructor(
    private teamsService: TeamsService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nav: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.teams = this.teamsService.getTeams();
      this.viewTeam(this.teams[0]);
    });
    }


    viewTeam(team: ITeam) {
      this.nav.navigateForward(`/team/${team.id}`);
  }
}
