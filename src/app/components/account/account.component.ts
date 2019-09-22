import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Account } from '../../display-classes';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {

  @Input() account: Account;
  @Output() show = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onCheckChange() {
    this.show.emit();
  }
}
