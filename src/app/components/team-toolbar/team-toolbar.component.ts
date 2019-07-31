import { Component, OnInit, Input } from '@angular/core';
import { ITeam } from 'src/app/data-interfaces';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'team-toolbar',
  templateUrl: './team-toolbar.component.html',
  styleUrls: ['./team-toolbar.component.scss'],
})
export class TeamToolbarComponent implements OnInit {

  @Input() team: ITeam;
  @Input() readOnly = true;

  constructor(private nav: NavController) { }

  ngOnInit() {}


  onSettingsClicked() {
    if (this.team !== undefined) {
      this.nav.navigateForward(`/team/${this.team.id}`);
    }
  }

  onViewSimsClicked() {
    if (this.team !== undefined) {
      this.nav.navigateForward(`/simulations/${this.team.id}`);
    }
  }


}
