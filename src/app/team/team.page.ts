import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from '../services/teams.service';
import { ITeam, ISimulation } from '../interfaces';
import { SimulationsService } from '../services/simulations.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {
  team: ITeam;
  simulations: ISimulation[];

  constructor(private route: ActivatedRoute,
              private teamService: TeamsService,
              private simulationService: SimulationsService) { }

  ngOnInit() {
     const id = +this.route.snapshot.params.id;
     this.team = this.teamService.getTeam(id);
     const accounts = this.team.accounts.map(account => account.id);
     this.simulations = this.simulationService.getSimulations(accounts);
     // TODO: if error occures here, nothing is loaded, maybe display error page?
  }

}
