import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-info',
  templateUrl: 'info.component.html',
  styleUrls: ['info.component.css']
})
export class InfoComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Output('updateDataFormInfosFromChild') updateDataForm = new EventEmitter<FormGroup>();
  private valueInfosChanged: boolean;

  constructor() { }
  ngOnInit() {
    this.onChanges();
  }

  emitDataInfos(): void {
    if(this.valueInfosChanged) {
      console.log("-?- " +  " emit data info child:", this.formGroup.value);
      this.valueInfosChanged = false;
      this.updateDataForm.emit(this.formGroup.value);
    }
  }

  onChanges(): void {
    this.formGroup.valueChanges.subscribe(val => {
      this.valueInfosChanged = true;
    });
  }

}
