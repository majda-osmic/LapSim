export interface ITeam {
    id: number;
    name: string;
    league: string;
    accounts: IAccountInfo[];
    budget: number;
    usedBudget: number;
}

export interface IAccountInfo {
    id: number;
    uniqueId: string;
    name: string;
    cpus: number;
}

export interface IAccountDetail {
    id: number;
    simulations: ISimulation[];
    // softwarePackage: ISoftwarePackage;
}

export interface ISimulation {
    id: number;
    name: string;
    // startTime: Date;
    // endTime: Date;
    cpus: number;
    usedBudget: number;
}

export interface ISoftwarePackage {
    software: ISoftware;
}

export interface ISoftware {
    id: number;
    name: string;
    version: string;
    timestamp: Date;
}
