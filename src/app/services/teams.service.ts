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
      this.createTeams(); // TODO: replace with data from server, mock for now
    }
    return this.teams;
  }

  getTeam(id: number): ITeam {
    return this.getTeams().find(item => item.id === id);
  }

  private createTeams() {
    this.teams = [{
        id: 1,
        name: 'Super Fast',
        league: '',
        budget: 100000,
        usedBudget: 5000,
        accounts: [{
          id: 1,
          uniqueId: 'a1b2c3',
          name: 'small account',
          cpus: 200,
        },
      ],
      },
      {
        id: 2,
        name: 'Not that fast',
        league: 'but still good enough to have 3 accounts',
        budget: 500000,
        usedBudget: 8562,
        accounts: [{
          id: 2,
          uniqueId: 'd4g57z3',
          name: 'large account',
          cpus: 500,
        },
        {
          id: 3,
          uniqueId: '3fzh6hu6',
          name: 'smaller account',
          cpus: 350,
        },
        {
          id: 7,
          uniqueId: '3f85456',
          name: 'smallest account',
          cpus: 100,
        }],
      }
    ];
  }

}
