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
    name: string;
    cpus: number;
    softwarePackage: ISoftwarePackage;
}

export interface ISimulation {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    duration: Date;
    cpus: number;
    usedBudget: number;
    runs: number;
    location: string;
}

export interface ISoftwarePackage {
    timeStamp: string;
    software: ISoftware[];
}

export interface ISoftware {
    name: string;
    version: string;
}

export interface IUserOptions {
    userName: string;
    password: string;
    token?: string;
    role?: IRole;
}

export interface IRole {
    value: string;
}

export interface IProjectLead {
    userName: string;
    teams: string[];
}
