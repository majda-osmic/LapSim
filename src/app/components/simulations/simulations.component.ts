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

  simulations: ISimulation[] = [];

  constructor(private simService: SimulationsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    this.simulations =  this.simService.getSimulationsForTeam(id);
  }

}
