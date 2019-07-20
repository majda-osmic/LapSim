import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from '../services/teams.service';
import { ITeam, ISimulation, IAccountDetail, IAccountInfo } from '../data-interfaces';
import { SimulationsService } from '../services/simulations.service';
import { IAccountDisplay } from '../display-interfaces';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {
  team: ITeam;
  progress: number;
  accounts: IAccountDisplay[];
  simulations: ISimulation[];
  budgetProgress: number;

  constructor(private route: ActivatedRoute,
              private teamService: TeamsService,
              private simulationService: SimulationsService) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    this.team = this.teamService.getTeam(id);
    this.progress = this.team.usedBudget / this.team.budget;
    const accountIds = this.team.accounts.map(account => account.id);
    const accountDetails = this.simulationService.getAccountDetails(accountIds);
    this.accounts = [];
    accountDetails.forEach(accountDetail => this.accounts.push(this.createAccountDisplay(accountDetail)));

    this.setVisibleSimulations();
    // TODO: if error occures here, nothing is loaded, maybe display error page?
  }

  onAccountCheckChange() {
    // TODO: optimize
    this.setVisibleSimulations();
  }

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


  private setVisibleSimulations() {
    const visibles = this.accounts.filter(account => account.checked === true);
    this.simulations = [].concat(...visibles.map(account => account.detail.simulations));
  }
}
