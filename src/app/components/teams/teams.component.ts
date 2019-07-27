import { Component, OnInit, Input } from '@angular/core';
import { ITeam } from 'src/app/data-interfaces';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {

  private teams: ITeam[];
  @Input() set loadedTeams(val: ITeam[]) {
    if (val !== undefined) {
      this.teams = val;
      this.viewTeam(this.teams[0]);
    }
  }
  selectedTeam: ITeam;
  constructor(private nav: NavController) { }

  ngOnInit() {
  }

  viewTeam(team: ITeam) {
    if (team !== undefined) {
      this.selectedTeam = team;
      this.nav.navigateForward(`/team/${team.id}`);
    }
  }
}
