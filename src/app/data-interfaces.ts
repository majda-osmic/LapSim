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
    softwarePackage: ISoftwarePackage;
}

export interface ISimulation {
    id: number;
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
    teams: ITeam[];
}
