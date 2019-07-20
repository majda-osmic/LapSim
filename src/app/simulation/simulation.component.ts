import { Component, OnInit, Input } from '@angular/core';
import { ISimulation } from '../interfaces';

@Component({
  selector: 'simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss'],
})
export class SimulationComponent implements OnInit {

  @Input() simulation: ISimulation;

  constructor() { }

  ngOnInit() {}

}
