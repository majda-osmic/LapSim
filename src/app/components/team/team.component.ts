import { Component, OnInit, Input } from '@angular/core';
import { ITeam, IAccountDetail } from 'src/app/data-interfaces';
import { IAccountDisplay } from 'src/app/display-interfaces';
import { TeamsService } from 'src/app/services/teams.service';
import { SimulationsService } from 'src/app/services/simulations.service';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {

  accounts: IAccountDisplay[];

  team: ITeam;
  get data(): ITeam {
    return this.team;
  }

  @Input() set data(val: ITeam) {
    this.team = val;
    this.accounts  = this.teamService.getAccountDisplay(this.team.id);
    }

  @Input() showDetails: boolean;

  constructor(private teamService: TeamsService,
              private simulationService: SimulationsService) { }

  ngOnInit() { }

  onAccountCheckChange() {
    this.simulationService.notifyAccountVisibilityChange(this.team.id);
  }
}
