import { Component, OnInit, Input } from '@angular/core';
import { ITeam } from 'src/app/data-interfaces';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {

  private expandedMap: Map<number, boolean> = new Map<number, boolean>();
  private teams: ITeam[];

  @Input() set loadedTeams(val: ITeam[]) {
    if (val !== undefined) {
      this.teams = val;
      this.teams.forEach(element => {
        this.expandedMap[element.id] = false;
      });
      this.viewTeam(this.teams[0]);
    }
  }

  selectedTeam: ITeam;

  constructor(private nav: NavController) { }

  ngOnInit() {
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
}
