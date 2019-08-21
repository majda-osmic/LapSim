import { Injectable } from '@angular/core';
import { IProjectLead } from '../data-interfaces';
import { UserData } from '../providers/user-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectLeadService {

  private leads: IProjectLead[] = [];
  constructor(private http: HttpClient, private userData: UserData) { }

  async getProjectLeads(): Promise<IProjectLead[]> {
    const isAdmin = await this.userData.isLoggedInAsAdmin();
    if (!isAdmin) {
      return [];
    }

    if (this.leads === undefined || this.leads.length === 0) {
      this.leads = await this.http.get<IProjectLead[]>(`api/projectLeaders`).toPromise();
    }

    this.leads.forEach(element => console.log(element));
    return this.leads;
  }

}
