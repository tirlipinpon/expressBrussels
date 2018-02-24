import {Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-option',
  templateUrl: 'option.component.html',
  styleUrls: ['option.component.css']
})
export class OptionComponent implements OnInit {

  @Input('formGroup') formGroup: FormGroup;

  constructor() {}

  ngOnInit() {}


}
