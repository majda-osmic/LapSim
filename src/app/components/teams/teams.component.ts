import { Component, OnInit } from '@angular/core';
import { ITeam } from 'src/app/data-interfaces';
import { NavController, Events } from '@ionic/angular';
import { TeamsService } from 'src/app/services/teams.service';
@Component({
  selector: 'teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {

  private expandedMap: Map<number, boolean> = new Map<number, boolean>();
  private teams: ITeam[];

  set loadedTeams(val: ITeam[]) {
    if (val !== undefined) {
      this.teams = val;
      this.teams.forEach(element => {
        this.expandedMap[element.id] = false;
      });
      this.viewTeam(this.teams[0]);
    }
  }

  selectedTeam: ITeam;

  constructor(private nav: NavController,
              private teamsService: TeamsService,
              private events: Events,
    ) { }

  async ngOnInit() {
    this.events.subscribe('user:login', () => {
      this.loadTeams();
    });

    this.events.subscribe('user:logout', () => {
      this.loadedTeams = [];
    });
    await this.loadTeams();
  }

  showDetails(team: ITeam) {
    if (team !== undefined) {
      this.expandedMap[team.id] = true;
    }
  }

  hideDetails(team: ITeam) {
    if (team !== undefined) {
      this.expandedMap[team.id] = false;
    }
  }

  viewTeam(team: ITeam) {
    if (team !== undefined) {
      this.selectedTeam = team;
      this.nav.navigateForward(`/team/${team.id}`);
    }
  }

  private async loadTeams() {
    this.loadedTeams = await this.teamsService.getTeams();
  }
}
