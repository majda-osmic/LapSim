import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationComponent } from './simulation.component';
import { ISimulation } from '../interfaces';

describe('SimulationComponent', () => {
  let component: SimulationComponent;
  let fixture: ComponentFixture<SimulationComponent>;
  const mockSimulation: ISimulation =  {
    id:  1,
    startTime: new Date(2019, 1, 6, 12, 38, 45),
    endTime: new Date(2019, 1, 6, 13, 56, 21),
    name: 'Sim 1',
    cpus: 25,
    usedBudget: 58,
    runs: 400,
    location: 'West US'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulationComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationComponent);
    component = fixture.componentInstance;
    component.simulation = mockSimulation;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
