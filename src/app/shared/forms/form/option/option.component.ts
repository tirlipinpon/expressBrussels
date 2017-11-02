import {Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  @Input('formGroup') formGroup: FormGroup;
  @Output() updateDataForm = new EventEmitter<FormGroup>();

  constructor() { }

  ngOnInit() {
    this.formGroup.valueChanges.subscribe(val => {
      this.saveData();
    });
  }



  saveData(): void {
    console.log('options changed = ', this.formGroup.value);
    this.updateDataForm.emit(this.formGroup.value);
  }

}
