import { Injectable } from '@angular/core';
import { ISimulation, IAccountDetail } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SimulationsService {

  private accounts: IAccountDetail[];
  constructor() { }


  getSimulations(accounts: number[]): ISimulation[] {
    const matchingSimulations =  this.getAllAccounts().filter(account => account.id in accounts).map(account => account.simulations);
    return [].concat(...matchingSimulations); // flatten
  }

  private getAllAccounts(): IAccountDetail[] {
    if (this.accounts === undefined || this.accounts.length === 0) {
      this.createMockAccounts(); // temporary
    }
    return this.accounts;
  }

  private createMockAccounts() {
    this.accounts = [
      {
        id: 1,
        simulations: [{
          id: 1,
          name: 'sim1',
          cpus: 25,
          usedBudget: 58,
        }]
      },
      {
        id: 2,
        simulations: [{
          id: 2,
          name: 'sim2',
          cpus: 25,
          usedBudget: 58,
        }]
      }];

  }
}
