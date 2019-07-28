import { Injectable } from '@angular/core';
import { ITeam, IAccountDetail } from '../data-interfaces';
import { MockService } from './mock.service';
import { IAccountDisplay } from '../display-interfaces';
import { UserData } from '../providers/user-data';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private teams: ITeam[];
  private accounts: IAccountDetail[];
  private teamToAccountDisplayMapping: Map<number, IAccountDetail[]> = new Map<number, IAccountDetail[]>();

  constructor(private mockService: MockService,
              private userData: UserData) { }

  getTeams(): Promise<ITeam[]> {
    return this.userData.isLoggedIn().then(loggedIn => {
      if (!loggedIn) {
        return [];
      }
      if (this.teams === undefined || this.teams.length === 0) {
        this.teams = this.mockService.createTeams(); // TODO: replace with data from server, mock for now
      }
      return this.teams;
    });
  }


  getTeam(id: number): Promise<ITeam> {
    return this.getTeams().then(teams => teams.find(item => item.id === id));
  }

  getAccountDisplay(teamId: number): Promise<IAccountDisplay[]> {
    if (this.teamToAccountDisplayMapping[teamId] === undefined) {
      this.getTeam(teamId).then(team => {
        const accountIds = team.accounts.map(account => account.id);
        const accountDetails = this.getAllAccounts().filter(account => accountIds.includes(account.id));
        const accountsDisplay = [];
        accountDetails.forEach(accountDetail => accountsDisplay.push(this.createAccountDisplay(team, accountDetail)));
        this.teamToAccountDisplayMapping[teamId] = accountsDisplay;
      });
    }

    return this.teamToAccountDisplayMapping[teamId];
  }

  private getAllAccounts(): IAccountDetail[] {
    if (this.accounts === undefined || this.accounts.length === 0) {
      this.accounts = this.mockService.createMockAccounts(); // temporary
    }
    return this.accounts;
  }

  private createAccountDisplay(team: ITeam, accountDetail: IAccountDetail): IAccountDisplay {
    const display: IAccountDisplay = {
      detail: accountDetail,
      info: team.accounts.find(item => item.id === accountDetail.id),
      // TODO: these should be saved into user settings
      checked: true,
      color: 'red',
    };
    return display;
  }


}
