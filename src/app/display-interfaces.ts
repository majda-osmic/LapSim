import { IAccountInfo,  IAccountDetail } from './data-interfaces';

export interface IAccountDisplay {
    info: IAccountInfo;
    detail: IAccountDetail;
    checked: boolean;
    color: string;
}
