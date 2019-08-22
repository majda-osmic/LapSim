import { Injectable, EventEmitter, Output } from '@angular/core';
import { ISimulation } from '../data-interfaces';
import { TeamsService } from './teams.service';
import { UserData } from '../providers/user-data';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SimulationsService {
  private teamVisibleSimulationMapping: Map<number, ISimulation[]> = new Map<number, ISimulation[]>();

  @Output() visibleItemsChanged: EventEmitter<string> = new EventEmitter();

  constructor(private teamService: TeamsService, private userData: UserData, private events: Events) {
    this.events.subscribe('user:login', () => {
      this.teamVisibleSimulationMapping.clear();
    });

    this.events.subscribe('user:logout', () => {
      this.teamVisibleSimulationMapping.clear();
    });
  }

  async getVisibleSimulationsForTeam(teamId: string): Promise<ISimulation[]> {
    const loggedIn = await this.userData.isLoggedIn();

    if (!loggedIn) {
      this.teamVisibleSimulationMapping.clear();
      return [];
    }
    // if there is no data, get it
    if (this.teamVisibleSimulationMapping[teamId] === undefined) {
      await this.setVisibileSimulationsForTeam(teamId);
    }
    return this.teamVisibleSimulationMapping[teamId];
  }

  private async setVisibileSimulationsForTeam(teamId: string) {
    // const result = await this.teamService.getAccountDisplay(teamId);
    // const accountDisplay = result.filter(item => item.checked === true);
    // this.teamVisibleSimulationMapping[teamId] = [].concat(...accountDisplay.map(data => data.detail.simulations));
  }

  async notifyAccountVisibilityChange(teamId: string) {
    // if the data has already been retrieved, update it
    if (this.teamVisibleSimulationMapping[teamId] !== undefined) {
      await this.setVisibileSimulationsForTeam(teamId);
    }
    this.visibleItemsChanged.emit(teamId);
  }

}
