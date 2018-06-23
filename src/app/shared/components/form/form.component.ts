import {Component, Input, Output, EventEmitter, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DataForm} from '../../../models/DataForm';
import {Contact} from "../../../models/contact";
import { Observable } from 'rxjs/Observable';
import {} from "@angular/material";
import {MatAutocompleteSelectedEvent} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css'],

})
export class FormComponent implements AfterViewInit {

  @Input('isCustomer') isCustomer: string;
  @Input('formGroup') formGroup: FormGroup;
  @Input('nameForm') nameForm: string;
  @Input('contact') contact: Observable<Contact[]>;
  @Input('datas') dataValues:  DataForm[];
  @Output() updateDataForm: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router) {}

  goPlaces(nameform: string): void {
    this.router.navigate(['/', 'menu', nameform]).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
  }

  ngAfterViewInit() {}

  itemSelectedName (evt: MatAutocompleteSelectedEvent) {
    this._initData(this.filterStatesName(evt.option.value));
  }
  itemSelectedRefClient (evt: MatAutocompleteSelectedEvent) {
    this._initData(this.filterStatesRefClient(evt.option.value));
  }

  filterStatesName(val: string): DataForm {
    const resp =  this.dataValues.filter(state =>
    state.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
    return resp[0];
  }
  filterStatesRefClient(val: string): DataForm {
    const resp =  this.dataValues.filter(state =>
    state.ref_client.toLowerCase().indexOf(val.toLowerCase()) === 0);
    return resp[0];
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
      fk_type: data.fk_type,
      addressValidated: data.addressValidated
    });
    this.saveDataCustomer();
  }
  saveDataCustomer(): void {
    this.updateDataForm.emit(this.nameForm);
  }


}
