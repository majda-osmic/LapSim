import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ITeam } from 'src/app/data-interfaces';
import { NavController } from '@ionic/angular';
import { TeamsService } from 'src/app/services/teams.service';
@Component({
  selector: 'teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit, OnChanges {

  private expandedMap: Map<number, boolean> = new Map<number, boolean>();
  private teams: ITeam[];

  @Input() teamsToDisplay: string[];


  selectedTeam: ITeam;

  constructor(private nav: NavController, private teamsService: TeamsService) { }

  async ngOnInit() {
    await this.loadTeams();
  }

  async ngOnChanges(changes: SimpleChanges) {
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
      this.expandedMap[team.id] = true;
      this.selectedTeam = team;
      this.nav.navigateForward(`/simulations/${team.id}`);
    }
  }

  private async loadTeams() {
    const loadedTeams = await this.teamsService.getTeams();

    if (loadedTeams !== undefined && this.teamsToDisplay !== undefined && this.teamsToDisplay.length > 0) {
     this.teams = loadedTeams.filter(team =>  this.teamsToDisplay.indexOf(team.id) > 0);
    } else {
      this.teams = loadedTeams;
    }
  }
}
