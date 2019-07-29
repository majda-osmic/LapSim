import { Injectable } from '@angular/core';
import { IProjectLead } from '../data-interfaces';
import { MockService } from './mock.service';
import { UserData } from '../providers/user-data';

@Injectable({
  providedIn: 'root'
})
export class ProjectLeadService {

  private leads: IProjectLead[] = [];
  constructor(private mockService: MockService, private userData: UserData) { }

  async getProjectLeads(): Promise<IProjectLead[]> {
    const isAdmin = await this.userData.isLoggedInAsAdmin();
    if (!isAdmin) {
      return [];
    }

    if (this.leads === undefined || this.leads.length === 0) {
      this.leads = this.mockService.createProjectLeads();
    }
    return this.leads;
  }

  async getProjectLeader(userName: string): Promise<IProjectLead> {
    const leads = await this.getProjectLeads();
    return leads.find(item => item.userName === userName);
  }
}
