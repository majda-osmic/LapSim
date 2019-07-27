import { Component, OnInit } from '@angular/core';
import { ISimulation } from 'src/app/data-interfaces';
import { SimulationsService } from 'src/app/services/simulations.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-simulations',
  templateUrl: './simulations.component.html',
  styleUrls: ['./simulations.component.scss'],
})
export class SimulationsComponent implements OnInit {
  teamID: number;
  simulations: ISimulation[] = [];

  constructor(private simService: SimulationsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.teamID = +this.route.snapshot.params.id;
    this.simulations =  this.simService.getVisibleSimulationsForTeam(this.teamID);
    this.simService.visibleItemsChanged.subscribe(teamId => this.updateVisibleSimulations(teamId));
    this.updateVisibleSimulations(this.teamID);
  }

  private updateVisibleSimulations(id: number) {
    if (this.teamID === id) {
      this.simulations =  this.simService.getVisibleSimulationsForTeam(id);
    }
  }
}
