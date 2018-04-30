import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {DataForm, DataDataFormState} from '../../../models/DataForm';
import {Contact} from "../../../models/contact";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css'],

})
export class FormComponent implements OnInit, OnDestroy {

  private test = false;

  @Input('isCustomer') isCustomer: string;
  @Input('formGroup') formGroup: FormGroup;
  @Input('nameForm') nameForm: string;
  @Input('contact') contact: Observable<Contact[]>;
  @Input('datas') set data(value: DataForm[]) {
    if (!!value) {
      if (this.isCustomer === 'customer') {
        if (!this.test){
          this._initData(value);
          this.test = true;
        }
      }else{
        if (this._user.length == 0) {
          for (let i=0; i< Object.keys(value).length; i++){
            this._user.push(value[i]);
          }
        }

      }
    }
  }

  @Output() updateDataForm = new EventEmitter();
  private _user: DataForm[] = [];

  constructor(private fb: FormBuilder) {}
  ngOnInit() {}
  ngOnDestroy() {}

  resetForm(formGroup: FormGroup): void {
    formGroup.reset();
  }

  // for customer
  private _initData(data): void {
    this.formGroup.patchValue({
      id: data.id,
      name: data.name,
      ref_client: data.ref_client!=='NULL' ? data.ref_client : '',
      address: data.address,
      number: data.number,
      cp: data.cp,
      state: data.state,
      clientZone: data.clientZone,
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
  saveDataCustomer(): void {
    this.updateDataForm.emit();
  }
}
