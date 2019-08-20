export interface ITeam {
    id: string;
    name: string;
    league: string;
    accounts: IAccountInfo[];
    budget: number;
    usedBudget: number;
}

export interface IAccountInfo {
    id: string;
    uniqueId: string;
    name: string;
    cpus: number;
}

export interface IAccountDetail {
    id: string;
    simulations: ISimulation[];
    softwarePackage: ISoftwarePackage;
}

export interface ISimulation {
    id: string;
    name: string;
    startTime: Date;
    endTime: Date;
    cpus: number;
    usedBudget: number;
    runs: number;
    location: string;
}

export interface ISoftwarePackage {
    timestamp: Date;
    software: ISoftware[];
}

export interface ISoftware {
    name: string;
    version: string;
}

export interface IUserOptions {
    userName: string;
    password: string;
    isAdmin: boolean;
}

export interface IProjectLead {
    userName: string;
    teams: string[];
}
