import { Injectable } from '@angular/core';
import { ISoftwarePackage, ISimulation } from '../data-interfaces';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() { }

   createTeams() {
    return [{
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

  createMockAccounts() {
    const packages = this.createMockSoftwarePackages();
    const mockSims = this.createMockSimulations();

    return [
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

  createMockSimulations(): ISimulation[] {
    const simulations = [
      // tslint:disable: max-line-length
      { id: 1, startTime: new Date(2019, 1, 6, 12, 38, 45), endTime: new Date(2019, 1, 6, 13, 56, 21), name: 'Sim 1', cpus: 25, usedBudget: 58, runs: 400, location: 'West US' },
      { id: 2, startTime: new Date(), endTime: new Date(), name: 'Sim 2', cpus: 25, usedBudget: 126, runs: 400, location: 'West US' },
      { id: 3, startTime: new Date(), endTime: new Date(), name: 'Large sim', cpus: 100, usedBudget: 236, runs: 400, location: 'East US' },
      { id: 4, startTime: new Date(), endTime: new Date(), name: 'Front Damper Variation', cpus: 136, usedBudget: 59, runs: 400, location: 'West Europe' },
      { id: 5, startTime: new Date(), endTime: new Date(), name: 'Rear Damper Variation', cpus: 125, usedBudget: 69, runs: 400, location: 'Central Europe' },
      { id: 6, startTime: new Date(), endTime: new Date(), name: 'Soft Tyres', cpus: 125, usedBudget: 69, runs: 400, location: 'West US' },
      { id: 7, startTime: new Date(), endTime: new Date(), name: 'Super Soft', cpus: 120, usedBudget: 87, runs: 400, location: 'Central Europe' },
      { id: 8, startTime: new Date(), endTime: new Date(), name: 'Another Large Sim', cpus: 350, usedBudget: 200, runs: 400, location: 'East US' },
      { id: 9, startTime: new Date(), endTime: new Date(), name: 'Slightly Larger Sim', cpus: 250, usedBudget: 258, runs: 400, location: 'Central Europe' },
      { id: 10, startTime: new Date(), endTime: new Date(), name: 'Not so large', cpus: 180, usedBudget: 147, runs: 400, location: 'North Europe' },
      // tslint:enable: max-line-length
    ];
    return simulations;
  }

  createMockSoftwarePackages(): ISoftwarePackage[] {
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
