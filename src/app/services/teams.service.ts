import { Injectable } from '@angular/core';
import { ITeam } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private teams: ITeam[];

  constructor() { }

  getTeams(): ITeam[] {
    if (this.teams === undefined || this.teams.length === 0) {
      this.createTeams(); //TODO: replace with data from server, mock for now
    }
    return this.teams;
  }

  getTeam(id: number): ITeam {
    return this.getTeams().find(item => item.id === id);
  }

  private createTeams() {
    this.teams = [
      {
        id: 1,
        name: 'Super Fast',
        league: '',
        accounts: 1,
        budget: 100000
      },
      {
        id: 2,
        name: 'Not that fast',
        league: 'but still good enough to have 3 accounts',
        accounts: 3,
        budget: 500000
      }
    ];
  }

}
