import { Injectable } from '@angular/core';
import { ITeam, IAccountDetail, IProjectLead } from '../data-interfaces';
import { MockService } from './mock.service';
import { IAccountDisplay } from '../display-interfaces';
import { UserData } from '../providers/user-data';
import { Events } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private teams: ITeam[];
  private accounts: IAccountDetail[];
  private teamToAccountDisplayMapping: Map<string, IAccountDetail[]> = new Map<string, IAccountDetail[]>();

  constructor(private http: HttpClient, private mockService: MockService, private userData: UserData, private events: Events) {
    this.events.subscribe('user:logout', () => {
      this.clear();
    });
  }

  async getTeams(): Promise<ITeam[]> {
    const loggedIn = this.userData.isLoggedIn();
    if (!loggedIn) {
      this.clear();
      return null; // todo: error
    }
    if (this.teams === undefined || this.teams.length === 0) {
      if (await this.userData.isLoggedInAsAdmin()) {
        this.teams = await this.http.get<ITeam[]>(`/api/teams/`).toPromise();
      } else {
        const userName = await this.userData.getUsername();
        this.teams = await this.http.get<ITeam[]>(`api/teams/pl/` + userName).toPromise();
      }
    }
    return this.teams;
  }


  async getTeam(id: string): Promise<ITeam> {
    await this.getTeams();
    return this.teams.find(item => item.id === id);
  }

  async getAccountDisplay(teamId: string): Promise<IAccountDisplay[]> {
    if (this.teamToAccountDisplayMapping[teamId] === undefined) {
      const team = await this.getTeam(teamId);
      if (team === undefined) { // todo: error
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
