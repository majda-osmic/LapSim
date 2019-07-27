import { Component, OnInit } from '@angular/core';
import { ISimulation, ITeam } from 'src/app/data-interfaces';
import { SimulationsService } from 'src/app/services/simulations.service';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-simulations',
  templateUrl: './simulations.component.html',
  styleUrls: ['./simulations.component.scss'],
})
export class SimulationsComponent implements OnInit {
  team: ITeam;
  progress: number;
  simulations: ISimulation[] = [];

  constructor(private simService: SimulationsService,
              private teamService: TeamsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const teamID = +this.route.snapshot.params.id;
    this.team = this.teamService.getTeam(teamID);
    this.progress = this.team.usedBudget / this.team.budget;
    this.simulations = this.simService.getVisibleSimulationsForTeam(teamID);
    this.simService.visibleItemsChanged.subscribe(teamId => this.updateVisibleSimulations(teamId));
    this.updateVisibleSimulations(teamID);
  }

  private updateVisibleSimulations(id: number) {
    if (this.team.id === id) {
      this.simulations = this.simService.getVisibleSimulationsForTeam(id);
    }
  }
}
