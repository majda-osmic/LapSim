import { Injectable } from '@angular/core';
import { ITeam,  IAccountInfo } from '../data-interfaces';
import { UserData } from '../providers/user-data';
import { Events } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { IAccountDisplay } from '../display-interfaces';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private teams: ITeam[];
   private teamToAccountDisplayMapping: Map<string, IAccountDisplay[]> = new Map<string, IAccountDisplay[]>();

  constructor(private http: HttpClient, private userData: UserData, private events: Events) {
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
      if (team === undefined) {
        this.clear();
        return [];
      }
      const accountsDisplay = [];
      team.accounts.forEach(account => accountsDisplay.push(this.createAccountDisplay(account)));
      this.teamToAccountDisplayMapping[teamId] = accountsDisplay;
    }
    return this.teamToAccountDisplayMapping[teamId];
  }

  private createAccountDisplay(accountInfo: IAccountInfo): IAccountDisplay {
    const display: IAccountDisplay = {
      info: accountInfo,
      // TODO: these should be saved to and retrieved from user settings
      checked: true,
      color: 'red',
    };
    return display;
  }

  private clear() {
    this.teams = [];
    this.teamToAccountDisplayMapping.clear();
  }

}
