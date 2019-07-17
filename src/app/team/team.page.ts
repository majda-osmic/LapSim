import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from '../services/teams.service';
import { ITeam, ISimulation, IAccountDetail, IAccountInfo } from '../interfaces';
import { SimulationsService } from '../services/simulations.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {
  team: ITeam;
  accountDetails: IAccountDetail[];
  simulations: ISimulation[];
  accountCheckedMapping: {[accountId: number]: boolean };

  constructor(private route: ActivatedRoute,
              private teamService: TeamsService,
              private simulationService: SimulationsService) { }

  ngOnInit() {
     const id = +this.route.snapshot.params.id;
     this.team = this.teamService.getTeam(id);
     const accountIds = this.team.accounts.map(account => account.id);
     this.accountDetails = this.simulationService.getAccountDetails(accountIds);
     this.accountCheckedMapping = [];
     this.team.accounts.forEach(account => this.accountCheckedMapping[account.id] = true);

     this.setVisibleSimulations();
     // TODO: if error occures here, nothing is loaded, maybe display error page?
  }

  onAccountCheckChange(accountId: number) {
    this.setVisibleSimulations();
  }

  private setVisibleSimulations() {
    const visibleSims = this.accountDetails.filter(account => this.accountCheckedMapping[account.id] === true);
    this.simulations = [].concat(...visibleSims.map(detail => detail.simulations));
  }
}
