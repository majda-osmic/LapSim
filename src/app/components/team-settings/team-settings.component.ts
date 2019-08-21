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

  teamID: string;
  team: ITeam;
  accounts: IAccountDisplay[];
  editActive = false;

  constructor(private teamService: TeamsService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.teamID = this.route.snapshot.params.id;
    this.teamService.getTeam(this.teamID).then(team => this.team = team);
    this.teamService.getAccountDisplay(this.teamID).then(accounts => this.accounts = accounts);
  }

  onEdit() {
    this.editActive = true;
  }

  onSave() {
    this.editActive = false;
  }

  onCancel() {
    this.editActive = false;
  }


}
