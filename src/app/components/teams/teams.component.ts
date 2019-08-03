import { Component, OnInit, Input, OnChanges } from '@angular/core';
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

  @Input() loadOnInit: string;

  @Input() set loadedTeams(val: ITeam[]) {
    if (val !== undefined && val.length > 0) {
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
  ) { }

  async ngOnInit() {
    await this.loadTeams();
  }

  async ngOnChanges() {
    // TODO: load if correct property
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
      this.nav.navigateForward(`/simulations/${team.id}`);
    }
  }

  private async loadTeams() {
    if (this.loadOnInit === 'true') {
      this.loadedTeams = await this.teamsService.getTeams();
    }
  }
}
