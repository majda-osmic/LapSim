import { Component, OnInit } from '@angular/core';
import { TeamsService } from 'src/app/services/teams.service';
import { ActivatedRoute } from '@angular/router';
import { ITeam } from 'src/app/data-interfaces';
import { IAccountDisplay } from 'src/app/display-interfaces';

@Component({
  selector: 'team-settings',
  templateUrl: './team-settings.component.html',
  styleUrls: ['./team-settings.component.scss'],
})
export class TeamSettingsComponent implements OnInit {

  teamID: number;
  team: ITeam;
  accounts: IAccountDisplay[];

  constructor(private teamService: TeamsService,
              private route: ActivatedRoute) { }



  async ngOnInit() {
    this.teamID = +this.route.snapshot.params.id;
    this.teamService.getTeam(this.teamID).then(team => this.team = team);
    this.teamService.getAccountDisplay(this.teamID).then(accounts => this.accounts = accounts);
  }

}
