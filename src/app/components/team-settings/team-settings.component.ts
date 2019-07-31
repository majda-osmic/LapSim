import { Component, OnInit } from '@angular/core';
import { TeamsService } from 'src/app/services/teams.service';
import { ActivatedRoute } from '@angular/router';
import { ITeam } from 'src/app/data-interfaces';

@Component({
  selector: 'team-settings',
  templateUrl: './team-settings.component.html',
  styleUrls: ['./team-settings.component.scss'],
})
export class TeamSettingsComponent implements OnInit {

  teamID: number;
  team: ITeam;

  constructor(private teamService: TeamsService,
              private route: ActivatedRoute) { }



  async ngOnInit() {
    this.teamID = +this.route.snapshot.params.id;
    this.team = await this.teamService.getTeam(this.teamID);
  }

}
