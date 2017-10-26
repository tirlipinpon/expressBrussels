import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as CustomerActions  from '../actions/customer.actions';
import * as RemovalActions  from '../actions/removal.actions';
import * as RecipientActions  from '../actions/recipient.actions';

import { DataForm }from '../models/DataForm';
import 'rxjs/add/operator/map';
import {AppState} from "../shared/appState";
import {FormBuilder, Validators, Form, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-purchasse-order',
  templateUrl: './purchasse-order.component.html',
  styleUrls: ['./purchasse-order.component.css']
})
export class PurchasseOrderComponent implements OnInit {

  customer$: Observable<DataForm>;
  removals$: Observable<DataForm[]>;
  recipients$: Observable<DataForm[]>;

  formCustomer: FormGroup;
  formRemoval: FormGroup;
  formRecipient: FormGroup;

  customer: any;
  customerId = 1;
  datas: any;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.customer$ = this.store.select('customer');
    this.removals$ = this.store.select('removals');
    this.recipients$ = this.store.select('recipients');
    this.initFormsCustomer();
    this.initFormsRemoval();
    this.initFormsRecipient();
  }

  ngOnInit() {
    //this.store.dispatch({type: CustomerActions.GET_CUSTOMER, payload: this.customerId });
    this.store.dispatch(new CustomerActions.GetCustomer(this.customerId));
    this.store.dispatch(new RemovalActions.GetRemovals(this.customerId*10+1)); // (id + type)  eg: id = 69; type=1 fk_type=691
    this.store.dispatch(new RecipientActions.GetRecipients(this.customerId*10+2)); // (id + type)  eg: id = 69; type=2 fk_type=692
  }

  onValueCustomerUpdated(data: DataForm): void {
    console.log('on customer value  changed: ', data);
    this.store.dispatch(new CustomerActions.EditCustomer(data));
  }
  onValueRemovalUpdated(data: DataForm): void {
    console.log('on removal value  changed: ', data);
    // this.store.dispatch(new CustomerActions.EditRemoval(data));
  }
  onValueRecipientUpdated(data: DataForm): void {
    console.log('on recipient value  changed: ', data);
    // this.store.dispatch(new RecipientActions.EditRecipient(data));
  }

  initFormsCustomer(): void {
    this.formCustomer = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      number: ['', Validators.required],
      cp: ['', Validators.required],
      state: ['', Validators.required],
      phone: ['', Validators.required],
      info1: ['', Validators.required],
      info2: ['', Validators.required],
      type: ['', Validators.required],
      fk_client: ['', Validators.required],
      active: ['', Validators.required],
      created: ['', Validators.required],
      fk_type: [0, Validators.required]
    });
  }
  initFormsRemoval(): void {
    this.formRemoval = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      number: ['', Validators.required],
      cp: ['', Validators.required],
      state: ['', Validators.required],
      phone: ['', Validators.required],
      info1: ['', Validators.required],
      info2: ['', Validators.required],
      type: ['', Validators.required],
      fk_client: ['', Validators.required],
      active: ['', Validators.required],
      created: ['', Validators.required],
      fk_type: ['', Validators.required],
    });
  }
  initFormsRecipient(): void {
    this.formRecipient = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      number: ['', Validators.required],
      cp: ['', Validators.required],
      state: ['', Validators.required],
      phone: ['', Validators.required],
      info1: ['', Validators.required],
      info2: ['', Validators.required],
      type: ['', Validators.required],
      fk_client: ['', Validators.required],
      active: ['', Validators.required],
      created: ['', Validators.required],
      fk_type: ['', Validators.required],
    });
  }


}
