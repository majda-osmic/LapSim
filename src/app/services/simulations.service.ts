import { Injectable, EventEmitter, Output } from '@angular/core';
import { ISimulation } from '../data-interfaces';
import { TeamsService } from './teams.service';
import { AuthService } from '../services/auth.service';
import { Events } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { IAccountDisplay } from '../display-interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SimulationsService {
  private accountToSimulationMapping: Map<number, ISimulation[]> = new Map<number, ISimulation[]>();


  @Output() visibleItemsChanged: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient, private teamService: TeamsService, private userData: AuthService, private events: Events) {
    this.events.subscribe('user:login', () => {
      this.accountToSimulationMapping.clear();
    });

    this.events.subscribe('user:logout', () => {
      this.accountToSimulationMapping.clear();
    });
  }

  async getVisibleSimulationsForTeam(teamId: string): Promise<ISimulation[]> {
    const loggedIn = await this.userData.isLoggedIn();

    if (!loggedIn) {
      this.accountToSimulationMapping.clear();
      return [];
    }
    const visbileIds = (await this.getVisibleAccounts(teamId)).map(item => item.info.id);
    if (visbileIds === undefined) {
      return [];
    }

    return await this.retrieveSimulationData(visbileIds);
  }


  private async retrieveSimulationData(visibleIds: string[]): Promise<ISimulation[]> {
    const result = [];
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < visibleIds.length; index++) {

      // TODO: add api for retrieval of serveral ids
      const id = visibleIds[index];
      if (this.accountToSimulationMapping[id] === undefined) {
        this.accountToSimulationMapping[id] = await this.getData(id);
      }
      result.push(...this.accountToSimulationMapping[id]);
    }
    return result;

  }

  private async getData(accountId: string): Promise<ISimulation[]> {
    return await this.http.get<ISimulation[]>(`/api/simulations/account/` + accountId)
      .pipe(map(response => {
          response.forEach(element => {
            element.endTime = new Date(element.endTime);
            element.startTime = new Date(element.startTime);
            element.duration = new Date(element.endTime.getTime() - element.startTime.getTime());
          });
          return response;
        })).toPromise();
  }


  private async getVisibleAccounts(teamId: string): Promise<IAccountDisplay[]> {
    return (await this.teamService.getAccountDisplay(teamId)).filter(item => item.checked === true);
  }

  async notifyAccountVisibilityChange(teamId: string) {
    this.visibleItemsChanged.emit(teamId);
  }

}
