import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'label-text',
  templateUrl: './label-text.component.html',
  styleUrls: ['./label-text.component.scss'],
})
export class LabelTextComponent implements OnInit {

  @Input() text: string;
  @Input() label: string;
  @Input() canEdit: false;
  @Input() inputType: any = 'text';
  @Output() edited: any;

  constructor() { }

  ngOnInit() {}

}
