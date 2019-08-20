import { Component, OnInit } from '@angular/core';
import { ISimulation, ITeam } from 'src/app/data-interfaces';
import { SimulationsService } from 'src/app/services/simulations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-simulations',
  templateUrl: './simulations.component.html',
  styleUrls: ['./simulations.component.scss'],
})
export class SimulationsComponent implements OnInit {
  teamID: number;
  team: ITeam;
  simulations: ISimulation[] = [];

  constructor(private simService: SimulationsService,
              private teamService: TeamsService,
              private route: ActivatedRoute) { }

  async ngOnInit() {
    this.teamID = +this.route.snapshot.params.id;
    this.simService.visibleItemsChanged.subscribe(async teamId => {
      await this.updateVisibleSimulations(teamId);
    });

    await this.getTeamData();
  }

  private async updateVisibleSimulations(id: string) {
    if (this.team !== undefined && this.team.id === id) {
      this.simulations = await this.simService.getVisibleSimulationsForTeam(id);
    }
  }

  private async getTeamData() {
    this.team = await this.teamService.getTeam(this.teamID);
    if (this.team !== undefined) {
      await this.updateVisibleSimulations(this.team.id);
    }
  }


}
