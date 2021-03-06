import { Component, OnInit, Input } from '@angular/core';
import { ITeam } from 'src/app/data-interfaces';
import { TeamsService } from 'src/app/services/teams.service';
import { SimulationsService } from 'src/app/services/simulations.service';
import { NavController } from '@ionic/angular';
import { Account } from 'src/app/display-classes';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {

  accounts: Account[];
  team: ITeam;
  get data(): ITeam {
    return this.team;
  }

  @Input() set data(val: ITeam) {
    if (val  !== undefined) {
      this.team = val;
      this.teamService.getAccountDisplay(this.team.id).then(value => this.accounts = value);
    }
  }

  @Input() showDetails: boolean;

  constructor(private teamService: TeamsService,
              private simulationService: SimulationsService,
              private nav: NavController) { }

  ngOnInit() { }


  onAccountCheckChange() {
    this.simulationService.notifyAccountVisibilityChange(this.team.id);
  }

  onSettingsClicked() {
    if (this.team !== undefined) {
      this.nav.navigateForward(`/team/${this.team.id}`);
    }
  }
}
