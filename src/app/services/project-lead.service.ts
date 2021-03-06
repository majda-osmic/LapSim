import { Injectable } from '@angular/core';
import { IProjectLead } from '../data-interfaces';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectLeadService {

  private leads: IProjectLead[] = [];
  constructor(private http: HttpClient, private userData: AuthService) { }

  async getProjectLeads(): Promise<IProjectLead[]> {
    const isAdmin = await this.userData.isLoggedInAsAdmin();
    if (!isAdmin) {
      return [];
    }

    if (this.leads === undefined || this.leads.length === 0) {
      this.leads = await this.http.get<IProjectLead[]>(`api/projectLeaders`).toPromise();
    }

    return this.leads;
  }

}
