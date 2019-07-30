import { Injectable } from '@angular/core';
import { ITeam, IAccountDetail } from '../data-interfaces';
import { MockService } from './mock.service';
import { IAccountDisplay } from '../display-interfaces';
import { UserData } from '../providers/user-data';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private teams: ITeam[];
  private accounts: IAccountDetail[];
  private teamToAccountDisplayMapping: Map<number, IAccountDetail[]> = new Map<number, IAccountDetail[]>();

  constructor(private mockService: MockService, private userData: UserData, private events: Events) {
    this.events.subscribe('user:logout', () => {
      this.clear();
    });
  }

  async getTeams(): Promise<ITeam[]> {
    const loggedIn = this.userData.isLoggedIn();
    if (!loggedIn) {
      this.clear();
      return [];
    }
    if (this.teams === undefined || this.teams.length === 0) {
      const userName = await this.userData.getUsername();
      this.teams = this.mockService.getTeams(userName); // TODO: replace with data from server, mock for now
    }
    return this.teams;
  }

  async getTeam(id: number): Promise<ITeam> {
    await this.getTeams();
    return this.teams.find(item => item.id === id);
  }

  async getAccountDisplay(teamId: number): Promise<IAccountDisplay[]> {
    if (this.teamToAccountDisplayMapping[teamId] === undefined) {
      const team = await this.getTeam(teamId);
      if (team === undefined) {
        this.clear();
        return [];
      }
      const accountIds = team.accounts.map(account => account.id);
      const accountDetails = this.getAllAccounts().filter(account => accountIds.includes(account.id));
      const accountsDisplay = [];
      accountDetails.forEach(accountDetail => accountsDisplay.push(this.createAccountDisplay(team, accountDetail)));
      this.teamToAccountDisplayMapping[teamId] = accountsDisplay;
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

  private clear() {
    this.teams = [];
    this.accounts = [];
    this.teamToAccountDisplayMapping.clear();
  }

}
