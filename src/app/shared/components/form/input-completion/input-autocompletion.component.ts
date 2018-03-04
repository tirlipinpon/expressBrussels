import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-input-autocompletion',
  templateUrl: 'input-autocompletion.component.html',
  styleUrls: ['input-autocompletion.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InputAutocompletionComponent implements OnInit {

  @Input() propName: string;
  @Input() propType: string;
  @Input() data: any;
  @Input() witchForm: number;
  @Input() formGroup: FormGroup;
  private showDropDown = false;

  constructor() { }

  ngOnInit() {}

  // auto completion
  toogleDropDown(value?: string, action: boolean) {
    this.showDropDown = action;
  }
  getSearchValue(value: string): string {
    return this.formGroup.get(this.propName).value;
  }
  private _initData1(data): void {
    // console.log('init data : ', data);
    this.formGroup.patchValue({
      id: data.id,
      name: data.name,
      ref_client: data.ref_client!=='NULL' ? data.ref_client : '',
      address: data.address,
      number: data.number,
      cp: data.cp,
      state: data.state,
      phone: data.phone,
      infos: {
        info1: data.infos.info1,
        info2: data.infos.info2,
      },
      type: data.type,
      fk_client: data.fk_client,
      active: data.active,
      created: data.created,
      fk_type: data.fk_type
    });
  }
  private _initData2(data: any): void {
    this.formGroup.patchValue({
      cp: data.cp,
      state: data.state
    });
  }
  setSelectdedValue(value: string,  data: string): void {
    if (this.witchForm === 1) {
      this._initData1(this.getByData(value, data));
    }else if (this.witchForm === 2) {
      this._initData2(this.getByData(value, data));
    }
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
