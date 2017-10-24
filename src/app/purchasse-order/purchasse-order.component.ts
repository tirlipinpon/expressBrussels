import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { DataForm }from '../models/DataForm';
import * as AllActions from '../actions/purchasseOrder.actions';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ServiceService} from "../servicse/service.service";
import 'rxjs/add/operator/map';
import {AppState} from "../shared/appState";

@Component({
  selector: 'app-purchasse-order',
  templateUrl: './purchasse-order.component.html',
  styleUrls: ['./purchasse-order.component.css']
})
export class PurchasseOrderComponent implements OnInit {

  customer$: Observable<DataForm>;

  type = 1;
  id = 0;

  customer: DataForm;
  removal: DataForm[];
  recipient: DataForm[];
  // customerFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>, private service: ServiceService) {

    this.customer$ = this.store.select('customer');

    this.service.getDataFormByType(0).subscribe(data => {
      console.log('get Customer', data);
      this.customer = data[0];
      this.store.dispatch(new AllActions.EditCustomer(this.customer));
    });
    this.service.getDataFormByType(1).subscribe(data => {
      // console.log('get Removal', data);
      this.removal = data;
      this.store.dispatch(new AllActions.EditRemoval(this.removal));
    });
    this.service.getDataFormByType(2).subscribe(data => {
      console.log('get Recipient', data);
      this.recipient = data;
      this.store.dispatch(new AllActions.EditRecipient(this.recipient));
    });
  }

  ngOnInit() {
    this.store.dispatch(new AllActions.GetCustomer());
    // this.service.getCustomer.subscribe();
  }

  onValueCustomerUpdated(newValue) {
    // console.log("onValueUpdated", newValue);
    this.store.dispatch(new AllActions.EditCustomer(newValue));
    // this.service.updateCustomer(newValue);
  }
  onValueRemovalUpdated(newValue) {
    // console.log("onValueUpdated", newValue);
    this.store.dispatch(new AllActions.EditRemoval(newValue));
  }
  onValueRecipientUpdated(newValue) {
    // console.log("onValueUpdated", newValue);
    this.store.dispatch(new AllActions.EditRecipient(newValue));
  }

  ajouterDataForm() {
    // console.log("type= "+this.type+" id= "+this.id);
    this.service.addDataForm(this.type,this.id);
  }

  // initForms(data): void {
  //   this.customerFormGroup = this.fb.group({
  //     name: ['', Validators.required],
  //     address: ['', Validators.required],
  //     number: ['', Validators.required],
  //     cp: ['', Validators.required],
  //     state: ['', Validators.required],
  //     phone: ['', Validators.required],
  //     info1: ['', Validators.required],
  //     info2: ['', Validators.required],
  //     type: ['', Validators.required],
  //     fk_client: ['', Validators.required],
  //     active: [true, Validators.required],
  //   });
  // }

}
