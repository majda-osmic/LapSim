import { Component, OnInit } from '@angular/core';
import { IProjectLead } from 'src/app/data-interfaces';
import { ProjectLeadService } from 'src/app/services/project-lead.service';
import { Events } from '@ionic/angular';


@Component({
  selector: 'project-leads',
  templateUrl: './project-leads.component.html',
  styleUrls: ['./project-leads.component.scss'],
})
export class ProjectLeadsComponent implements OnInit {

  projectLeaders: IProjectLead[];
 constructor(private plService: ProjectLeadService, private events: Events) { }

  async ngOnInit() {
    await this.retrieveLeads();
  }

  private async retrieveLeads() {
    this.projectLeaders = await this.plService.getProjectLeads();
  }
}
