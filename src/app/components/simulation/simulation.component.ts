import { Component, OnInit, Input } from '@angular/core';
import { ISimulation } from '../../data-interfaces';

@Component({
  selector: 'simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss'],
})
export class SimulationComponent implements OnInit {

  @Input() simulation: ISimulation;

get duration(): string {
  const diff =  new Date(new Date(this.simulation.endTime).getTime() - new Date(this.simulation.startTime).getTime());
  return `${diff.getHours()}h ${diff.getMinutes()}m`;
}

  constructor() { }

  ngOnInit() {
  }


}
