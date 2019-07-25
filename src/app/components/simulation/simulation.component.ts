import { Component, OnInit, Input } from '@angular/core';
import { ISimulation } from '../../data-interfaces';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from 'src/app/services/teams.service';
import { SimulationsService } from 'src/app/services/simulations.service';

@Component({
  selector: 'simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss'],
})
export class SimulationComponent implements OnInit {

  @Input() simulation: ISimulation;

  constructor() { }

  ngOnInit() {
  }

}
