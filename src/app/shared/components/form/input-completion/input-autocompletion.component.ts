import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-input-autocompletion',
  templateUrl: 'input-autocompletion.component.html',
  styleUrls: ['input-autocompletion.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InputAutocompletionComponent implements OnInit {

  @Input() name: string;
  @Input() data: any;
  @Input() formGroup: FormGroup;
  private showDropDown = false;

  constructor() { }

  ngOnInit() {}

  // auto completion
  toogleDropDown(value?: string, action: boolean) {
    this.showDropDown = action;
  }
  getSearchValue(value: string): string {
    return this.formGroup.value.cp;
  }
  private _initData(data: any): void {
    this.formGroup.patchValue({
      cp: data.cp,
      state: data.ville
    });
  }
  setSelectdedValue(value: string,  data: string): void {
    this._initData(this.getByData(value, data));
    this.toogleDropDown();
    this.formGroup.markAsDirty();
  }
  getByData(value: string, data: any): any {
    let arrayWithElem;
    arrayWithElem = this.data.filter(elem => {
      return elem[value] === data
    });
    return arrayWithElem[0];
  }

}
