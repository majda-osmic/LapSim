import { Injectable } from '@angular/core';
import { ISimulation, IAccountDetail, ISoftwarePackage } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SimulationsService {

  private accounts: IAccountDetail[];
  constructor() { }

  getAccountDetails(accounts: number[]): IAccountDetail[] {
    return this.getAllAccounts().filter(account => accounts.includes(account.id));
  }

  getSimulations(accounts: number[]): ISimulation[] {
    const matchingSimulations = this.getAccountDetails(accounts).map(account => account.simulations);
    return [].concat(...matchingSimulations); // flatten
  }

  private getAllAccounts(): IAccountDetail[] {
    if (this.accounts === undefined || this.accounts.length === 0) {
      this.createMockAccounts(); // temporary
    }
    return this.accounts;
  }

  private createMockAccounts() {
    const packages = this.createMockSoftwarePackages();
    const mockSims = this.createMockSimulations();

    this.accounts = [
      {
        id: 1,
        simulations: mockSims.slice(0, 2),
        softwarePackage: packages[0]
      },
      {
        id: 2,
        simulations: mockSims.slice(3, 4),
        softwarePackage: packages[1]
      },
      {
        id: 3,
        simulations: mockSims.slice(5, 7),
        softwarePackage: packages[2]

      },
      {
        id: 7,
        simulations: mockSims.slice(8), // the rest
        softwarePackage: packages[1]
      }
    ];
  }

  private createMockSimulations(): ISimulation[] {
    const simulations = [
      { id:  1, name: 'sim 1', cpus: 25, usedBudget: 58, runs: 400, location: 'West US' },
      { id:  2, name: 'sim 2', cpus: 25, usedBudget: 126, runs: 400, location: 'West US' },
      { id:  3, name: 'large sim', cpus: 100, usedBudget: 236, runs: 400, location: 'East US' },
      { id:  4, name: 'front damper variation', cpus: 136, usedBudget: 59, runs: 400, location: 'West Europe' },
      { id:  5, name: 'rear damper variation', cpus: 125, usedBudget: 69, runs: 400, location: 'Central Europe' },
      { id:  6, name: 'soft tyres', cpus: 125, usedBudget: 69, runs: 400, location: 'West US' },
      { id:  7, name: 'super soft', cpus: 120, usedBudget: 87, runs: 400, location: 'Central Europe'},
      { id:  8, name: 'another large sim', cpus: 350, usedBudget: 200, runs: 400, location: 'East US' },
      { id:  9, name: 'slightly larger sim', cpus: 250, usedBudget: 258, runs: 400, location: 'Central Europe' },
      { id: 10, name: 'not so large', cpus: 180, usedBudget: 147, runs: 400, location: 'North Europe' },
    ];
    return simulations;
  }

  private createMockSoftwarePackages(): ISoftwarePackage[] {
    const packages = [
      {
        timestamp: new Date(),
        software: [
          { name: 'SuperFastSim', version: '1.1.3.6' },
          { name: 'AnalysisSoft', version: '3.4.0.8' },
        ]
      },
      {
        timestamp: new Date(),
        software: [
          { name: 'SuperFastSim', version: '1.1.3.6' },
          { name: 'AnalysisSoft', version: '3.4.1.5' },
        ]
      },
      {
        timestamp: new Date(),
        software: [
          { name: 'SuperFastSim', version: '1.1.3.6' },
          { name: 'AnalysisSoft', version: '3.4.0.7' },
        ]
      }
    ];
    return packages;
  }
}
