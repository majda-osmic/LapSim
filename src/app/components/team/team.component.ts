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
  progress: number;

  team: ITeam;
  get data(): ITeam {
    return this.team;
  }

  @Input() set data(val: ITeam) {
    this.team = val;

    this.progress = this.team.usedBudget / this.team.budget;
    const accountIds = this.team.accounts.map(account => account.id);
    const accountDetails = this.simulationService.getAccountDetails(accountIds);
    this.accounts = [];
    accountDetails.forEach(accountDetail => this.accounts.push(this.createAccountDisplay(accountDetail)));
  }

  @Input() showDetails: boolean;

  constructor(private teamService: TeamsService,
              private simulationService: SimulationsService) { }

  ngOnInit() { }

  private createAccountDisplay(accountDetail: IAccountDetail): IAccountDisplay {
    const display: IAccountDisplay = {
      detail: accountDetail,
      info: this.team.accounts.find(item => item.id === accountDetail.id),
      // TODO: these should be saved into user settings
      checked: true,
      color: 'red',
    };
    return display;
  }

  onAccountCheckChange() {
    // TODO
  }


}
