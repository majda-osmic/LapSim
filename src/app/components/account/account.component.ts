import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IAccountDisplay } from '../../display-interfaces';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {

  @Input() account: IAccountDisplay;
  @Input() preview: boolean;
  @Output() show = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onCheckChange() {
    this.show.emit();
  }
}
