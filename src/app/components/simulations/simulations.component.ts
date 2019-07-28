import { Component, OnInit } from '@angular/core';
import { ISimulation, ITeam } from 'src/app/data-interfaces';
import { SimulationsService } from 'src/app/services/simulations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamsService } from 'src/app/services/teams.service';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-simulations',
  templateUrl: './simulations.component.html',
  styleUrls: ['./simulations.component.scss'],
})
export class SimulationsComponent implements OnInit {
  teamID: number;
  team: ITeam;
  progress: number;
  simulations: ISimulation[] = [];

  constructor(private simService: SimulationsService,
              private teamService: TeamsService,
              private route: ActivatedRoute,
              private events: Events
  ) { }

  ngOnInit() {
    this.teamID = +this.route.snapshot.params.id;
    this.simService.visibleItemsChanged.subscribe(teamId => this.updateVisibleSimulations(teamId));
    this.listenForLoginEvents();
    this.getTeamData();
  }

  listenForLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.getTeamData();
    });

    this.events.subscribe('user:logout', () => {
      this.clearData();
    });
  }

  private updateVisibleSimulations(id: number) {
    if (this.team.id === id) {
      this.simService.getVisibleSimulationsForTeam(id).then(result => this.simulations = result);
    }
  }

  private getTeamData() {
    this.teamService.getTeam(this.teamID).then(team => {
      this.team = team;
      if (team !== undefined) {
        this.progress = this.team.usedBudget / this.team.budget;
      }
    });
  }

  private clearData() {
    this.simulations = [];
    this.team = undefined;
    this.progress = 0;
  }

}
