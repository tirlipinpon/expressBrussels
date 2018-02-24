import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {DataForm, DataDataFormState} from '../../../models/DataForm';


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
    // console.log('set value: ', value);
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
            // console.log('this._user '+ this.nameForm + ' = ', this._user);
          }
        }

      }
    }
  }

  @Output() updateDataForm = new EventEmitter();

  private showDropDown = false;
  private showDropDownRef = false;
  private _user: DataForm[] = [];

  constructor() {}
  ngOnInit() {}
  ngOnDestroy() {}

  private _initData(data): void {
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
  // for customer
  saveDataCustomer(): void {
    // console.log('-?- ' + this.nameForm + ' button pushed for save data = ', this.formGroup.value);
    this.updateDataForm.emit();
  }
  // auto completion
  toogleDropDown(value?: string) {
    if (value === 'name') {
      this.showDropDown = !this.showDropDown;
      this.showDropDownRef = false;
    } else if (value === 'ref_client') {
      this.showDropDownRef = !this.showDropDownRef;
      this.showDropDown = false;
    }else{
      this.showDropDown = !this.showDropDown;
      this.showDropDownRef = !this.showDropDownRef;
    }
  }
  getSearchValue(value: string): string {
    if (value === 'name') {
      return this.formGroup.value.name;
    } else if (value === 'ref_client') {
      return this.formGroup.value.ref_client;
    }
  }
  setSelectdedValue(value: string,  data: string): void {
    if (value === 'name') {
      this._initData(this.getByData(value, data));
    } else if (value === 'ref_client') {
      this._initData(this.getByData(value, data));
    }
    this.toogleDropDown();
    this.formGroup.markAsDirty();
  }
  getByData(value, data): DataForm {
    let arrayWithElem;
    if (value === 'name') {
      arrayWithElem = this._user.filter(elem => elem.name === data);
    } else if (value === 'ref_client') {
      arrayWithElem = this._user.filter(elem => elem.ref_client === data);
    }
    return arrayWithElem[0];
  }
  resetForm(formGroup: FormGroup): void {
    formGroup.reset();
    this.formGroup.markAsPristine();
  }
}
