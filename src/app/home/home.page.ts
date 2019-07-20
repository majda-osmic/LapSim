import { Component, OnInit } from '@angular/core';
import { ITeam } from '../data-interfaces';
import { TeamsService } from '../services/teams.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  teams: ITeam[];

  constructor(private teamsService: TeamsService,
              private nav: NavController) {
  }

  ngOnInit() {
    this.teams = this.teamsService.getTeams();
  }

  viewTeam(team: ITeam) {
    this.nav.navigateForward(`/team/${team.id}`);
  }
}
