import { Injectable } from '@angular/core';
import { ISimulation, IAccountDetail, ISoftwarePackage, ITeam } from '../data-interfaces';
import { TeamsService } from './teams.service';
import { MockService } from './mock.service';

@Injectable({
  providedIn: 'root'
})
export class SimulationsService {

  private accounts: IAccountDetail[];
  constructor(private teamService: TeamsService,
              private mockService: MockService) { }

  getAccountDetails(accounts: number[]): IAccountDetail[] {
    return this.getAllAccounts().filter(account => accounts.includes(account.id));
  }

  // private createAccountDisplay(accountDetail: IAccountDetail): IAccountDisplay {
  //   const display: IAccountDisplay = {
  //     detail: accountDetail,
  //     info: this.team.accounts.find(item => item.id === accountDetail.id),
  //     // TODO: these should be saved into user settings
  //     checked: true,
  //     color: 'red',
  //   };
  //   return display;
  // }

  getSimulationsForTeam(teamId: number): ISimulation[] {
    const team = this.teamService.getTeam(teamId);
    const accountIds = team.accounts.map(account => account.id);
    return this.getSimulations(accountIds);
  }

  getSimulations(accounts: number[]): ISimulation[] {
    const matchingSimulations = this.getAccountDetails(accounts).map(account => account.simulations);
    return [].concat(...matchingSimulations); // flatten
  }

  private getAllAccounts(): IAccountDetail[] {
    if (this.accounts === undefined || this.accounts.length === 0) {
      this.accounts = this.mockService.createMockAccounts(); // temporary
    }
    return this.accounts;
  }

}
