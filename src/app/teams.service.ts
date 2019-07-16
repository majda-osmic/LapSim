import { Injectable } from '@angular/core';
import { ITeam } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor() { }

  getTeams(): ITeam[] {
    //temporary, will be replaced with real logic
    return[
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
        accounts : 3,
        budget: 500000
      }
    ];
  }

}
