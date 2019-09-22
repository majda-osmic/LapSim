import { IAccountInfo } from './data-interfaces';

export class Account {
    checked: boolean;
    color: string;

    get lastUpdate(): string {
        return new Date(this.info.softwarePackage.timeStamp).toLocaleDateString();
    }

    constructor(public info: IAccountInfo) {
        this.checked = true;
        this.color = 'red'; // TODO: add colors
    }
}
