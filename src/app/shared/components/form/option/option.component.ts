import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-option',
  templateUrl: 'option.component.html',
  styleUrls: ['option.component.css']
})
export class OptionComponent implements OnInit {

  @Input('formGroup') formGroup: FormGroup;
  @Output() updateDataForm: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    this.formGroup.valueChanges.subscribe(() => {
      this.updateDataForm.emit('option');
    });
  }


}
