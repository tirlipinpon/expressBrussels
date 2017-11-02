import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as CustomerActions  from '../actions/customer.actions';
import * as RemovalActions  from '../actions/removal.actions';
import * as RecipientActions  from '../actions/recipient.actions';
import * as OrderActions  from '../actions/purchasseOrder.actions';

import { DataForm }from '../models/DataForm';
import 'rxjs/add/operator/map';
import {AppState} from "../shared/appState";
import {FormBuilder, Validators, Form, FormGroup} from "@angular/forms";
import {PurchasseOrder} from "../models/PurchasseOrder";

@Component({
  selector: 'app-purchasse-order',
  templateUrl: './purchasse-order.component.html',
  styleUrls: ['./purchasse-order.component.css']
})
export class PurchasseOrderComponent implements OnInit {

  googleApiKey = "AIzaSyCrX3-prCSV5ilithphw0ECuWIlFuiASm4"
  customer$: Observable<DataForm>;
  removals$: Observable<DataForm[]>;
  recipients$: Observable<DataForm[]>;
  order$: Observable<PurchasseOrder>;

  formCustomer: FormGroup;
  formRemoval: FormGroup;
  formRecipient: FormGroup;
  formOptions: FormGroup;

  customer: any;
  customerId = 1;
  datas: any;

  nameForm =['customer','removal','recipient']

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.customer$ = this.store.select((s: AppState)=> s.customer);
    this.removals$ = this.store.select('removals');
    this.recipients$ = this.store.select('recipients');
    this.order$ = this.store.select('currentPurchasseOrders');

    this.initFormsCustomer();
    this.initFormsRemoval();
    this.initFormsRecipient();
    this.initFormsOptions();
  }

  ngOnInit() {
    //this.store.dispatch({type: CustomerActions.GET_CUSTOMER, payload: this.customerId });
    this.store.dispatch(new CustomerActions.GetCustomer(this.customerId));
    // this.store.dispatch(new OrderActions.InitOrder(this.customerId));
    this.store.dispatch(new RemovalActions.GetRemovals(this.customerId*10+1)); // (id + type)  eg: id = 69; type=1 fk_type=691
    this.store.dispatch(new RecipientActions.GetRecipients(this.customerId*10+2)); // (id + type)  eg: id = 69; type=2 fk_type=692
  }

  onValueCustomerUpdated(data: DataForm): void {
    console.log('on customer value  changed: ', data);
    this.store.dispatch(new CustomerActions.EditCustomer(data));
  }

  onValueOrderRemovalUpdated(data: number): void {
    console.log('on order removal id changed: ', data);
    this.store.dispatch(new OrderActions.EditOrderRemoval(data));
    // this.store.dispatch(new OrderActions.EditOrderRemovalInfos({info1:'',info2:''}));

  }
  onValueOrderRecipientUpdated(data: number): void {
    console.log('on order  recipient id  changed: ', data);
    this.store.dispatch(new OrderActions.EditOrderRecipient(data));
  }
  onValueOrderRemovalInfosUpdated(data: any): void {
    console.log('on infos removal value  changed: ', data);
    this.store.dispatch(new OrderActions.EditOrderRemovalInfos(data));
  }
  onValueOrderRecipientInfosUpdated(data: any): void {
    console.log('on infos recipient value  changed: ', data);
    this.store.dispatch(new OrderActions.EditOrderRecipientInfos(data));
  }
  onValueOrderOptionsUpdated(data: PurchasseOrder): void {
    console.log('on option value  changed: ', data);
    this.store.dispatch(new OrderActions.EditOrderOption(data));
  }

  initFormsCustomer(): void {
    this.formCustomer = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', Validators.required],
      address: ['', Validators.required],
      number: ['', Validators.required],
      cp: ['', Validators.required],
      state: ['', Validators.required],
      phone: ['', Validators.required],
      infos: this.fb.group({
        info1: ['', [Validators.required]],
        info2: ['', [Validators.required]],
      }),
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
      infos: this.fb.group({
        info1: ['', [Validators.required]],
        info2: ['', [Validators.required]],
      }),
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
      infos: this.fb.group({
        info1: ['', [Validators.required]],
        info2: ['', [Validators.required]],
      }),
      type: ['', Validators.required],
      fk_client: ['', Validators.required],
      active: ['', Validators.required],
      created: ['', Validators.required],
      fk_type: ['', Validators.required],
    });
  }
  initFormsOptions(): void {
    this.formOptions = this.fb.group({
      options: ['express', Validators.required],
      tomorrow: [false, Validators.required]
    });
  }

  canDeactivate():boolean {
    // console.log("canDeactivate : is form Completed:" +this.isformCompleted);
    return  !this.formRemoval.dirty && !this.formRecipient.dirty;
  }
  isFormsValide(): boolean{
    return  this.formRemoval.valid && this.formRecipient.valid;
  }
  resetOrder(){
    // console.log('reset order');
    // this.isformCompleted = 0;
    this.store.dispatch(new OrderActions.InitOrder(this.customerId));
  }

  recapOrder() {
    console.log("button order clicked");
  }

}
