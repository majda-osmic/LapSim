import { Injectable, EventEmitter, Output } from '@angular/core';
import { ISimulation } from '../data-interfaces';
import { TeamsService } from './teams.service';
import { UserData } from '../providers/user-data';
@Injectable({
  providedIn: 'root'
})
export class SimulationsService {
  private teamVisibleSimulationMapping: Map<number, ISimulation[]> = new Map<number, ISimulation[]>();

  @Output() visibleItemsChanged: EventEmitter<number> = new EventEmitter();

  constructor(private teamService: TeamsService, private userData: UserData) { }

  getVisibleSimulationsForTeam(teamId: number): Promise<ISimulation[]> {
    return this.userData.isLoggedIn().then(loggedIn => {
      if (!loggedIn) {
        return [];
      }
      // if there is no data, get it
      if (this.teamVisibleSimulationMapping[teamId] === undefined) {
        this.setVisibileSimulationsForTeam(teamId);
      }
      return this.teamVisibleSimulationMapping[teamId];
    });

  }

  private setVisibileSimulationsForTeam(teamId: number) {
    this.teamService.getAccountDisplay(teamId).then(result => {
      const accountDisplay = result.filter(item => item.checked === true);
      this.teamVisibleSimulationMapping[teamId] = [].concat(...accountDisplay.map(data => data.detail.simulations));
    });
  }

  notifyAccountVisibilityChange(teamId: number) {
    // if the data has already been retrieved, update it
    if (this.teamVisibleSimulationMapping[teamId] !== undefined) {
      this.setVisibileSimulationsForTeam(teamId);
    }

    this.visibleItemsChanged.emit(teamId);
  }

}
