import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup } from "@angular/forms";
import {DataForm, DataDataFormState} from "../../../models/DataForm";


@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {

  private test = false;

  @Input('isCustomer') isCustomer: boolean;
  @Input('formGroup') formGroup: FormGroup;
  @Input('nameForm') nameForm: string;
  @Input('datas') set data(value: DataForm[]) {
    console.log('set value: ', value);
    if (!!value) {
      if (this.isCustomer) {
        if(!this.test){
          this._initData(value);
          this.test = true;
        }

      }else{
        if(this._user.length == 0) {
          for(let i=0; i< Object.keys(value).length; i++){
            this._user.push(value[i]);
            // console.log("this._user "+ this.nameForm + " = ", this._user);
          }
        }

      }
    }
  }

  @Output() updateDataForm = new EventEmitter();

  private showDropDown = false;
  private _user: DataForm[] = [];

  constructor() {}
  ngOnInit() {}
  ngOnDestroy() {}

  private _initData(data): void {
    console.log("init data : ", data);
    this.formGroup.patchValue({
      id: data.id,
      name: data.name,
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
  // for customer
  saveDataCustomer(): void {
    // console.log("-?- " + this.nameForm + ' button pushed for save data = ', this.formGroup.value);
    this.updateDataForm.emit();
  }
  // auto completion
  toogleDropDown() {
    this.showDropDown = !this.showDropDown;
  }
  getSearchValue() {
    return this.formGroup.value.name;
  }
  initSelectdedValue(value) {
    this._initData(this.getByValue(value));
    this.toogleDropDown();
    this.formGroup.markAsDirty();
  }
  getByValue(value): DataForm {
    let arrayWithElem = this._user.filter(elem => elem.name === value);
    return arrayWithElem[0];
  }
  resetForm(formGroup: FormGroup): void {
    formGroup.reset();
    this.formGroup.markAsPristine();
  }
}
