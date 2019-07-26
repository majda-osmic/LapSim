import { Injectable } from '@angular/core';
import { ITeam } from '../data-interfaces';
import { MockService } from './mock.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private teams: ITeam[];

  constructor(private mockService: MockService) { }

  getTeams(): ITeam[] {
    if (this.teams === undefined || this.teams.length === 0) {
      this.teams = this.mockService.createTeams(); // TODO: replace with data from server, mock for now
    }
    return this.teams;
  }

  getTeam(id: number): ITeam {
    return this.getTeams().find(item => item.id === id);
  }


}
