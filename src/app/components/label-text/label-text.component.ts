import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'label-text',
  templateUrl: './label-text.component.html',
  styleUrls: ['./label-text.component.scss'],
})
export class LabelTextComponent implements OnInit {

  @Input() text: string;
  @Input() label: string;

  constructor() { }

  ngOnInit() {}

}
