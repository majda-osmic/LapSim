import { Injectable } from '@angular/core';
import { ITeam } from '../data-interfaces';
import { AuthService } from '../services/auth.service';
import { Events } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Account } from '../display-classes';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private teams: ITeam[];
   private teamToAccountDisplayMapping: Map<string, Account[]> = new Map<string, Account[]>();

  constructor(private http: HttpClient, private auth: AuthService, private events: Events) {
    this.events.subscribe('user:logout', () => {
      this.clear();
    });
  }

  async getTeams(): Promise<ITeam[]> {
    const loggedIn = this.auth.isLoggedIn();
    if (!loggedIn) {
      this.clear();
      return null; // todo: error
    }
    if (this.teams === undefined || this.teams.length === 0) {
      if (await this.auth.isLoggedInAsAdmin()) {
        this.teams = await this.http.get<ITeam[]>(`/api/teams/`).toPromise();
      } else {
        const userName = await this.auth.getUsername();
        this.teams = await this.http.get<ITeam[]>(`api/teams/pl/` + userName).toPromise();
      }
    }
    return this.teams;
  }


  async getTeam(id: string): Promise<ITeam> {
    await this.getTeams();
    return this.teams.find(item => item.id === id);
  }

  async getAccountDisplay(teamId: string): Promise<Account[]> {
    if (this.teamToAccountDisplayMapping[teamId] === undefined) {
      const team = await this.getTeam(teamId);
      if (team === undefined) {
        console.log('team is unefined');

        this.clear();
        return [];
      }
      const accountsDisplay = [];
      console.log(team.accounts);
      team.accounts.forEach(account => accountsDisplay.push(new Account(account)));
      this.teamToAccountDisplayMapping[teamId] = accountsDisplay;
    }

    console.log(this.teamToAccountDisplayMapping[teamId][0].info);
    return this.teamToAccountDisplayMapping[teamId];
  }

  private clear() {
    this.teams = [];
    this.teamToAccountDisplayMapping.clear();
  }

}
