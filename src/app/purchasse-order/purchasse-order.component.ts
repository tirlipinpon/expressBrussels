import {Component, OnInit, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as CustomerActions  from '../actions/customer.actions';
import * as RemovalActions  from '../actions/removal.actions';
import * as RecipientActions  from '../actions/recipient.actions';
import * as OrderActions  from '../actions/purchasseOrder.actions';

import { DataForm }from '../models/DataForm';
import 'rxjs/add/operator/map';
import {AppState} from "../shared/appState";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {PurchasseOrder} from "../models/PurchasseOrder";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-purchasse-order',
  templateUrl: './purchasse-order.component.html',
  styleUrls: ['./purchasse-order.component.css']
})
export class PurchasseOrderComponent implements OnInit, OnDestroy {

  removals$: Observable<DataForm[]>;
  recipients$: Observable<DataForm[]>;
  order$: Observable<PurchasseOrder>;

  formRemoval: FormGroup;
  formRecipient: FormGroup;
  formOptions: FormGroup;

  private valueRemovalChanges$;
  private valueRecipientChanges$;
  private valueOptionsChanges$;
  private valueRemovalInfosChanges$;
  private valueRecipientInfosChanges$;

  customerId = 1;
  datas: any;
  nameForm = ['removal','recipient'];

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private notificationsService: NotificationService)
  {
    this.storeSelect();

    this.initFormsRemoval();
    this.initFormsRecipient();
    this.initFormsOptions();
  }

  ngOnInit() {
    this.storeDispatch();
    this.onValueOrderChanged();
  }
  ngOnDestroy() {
    this.valueRemovalChanges$.unsubscribe();
    this.valueRecipientChanges$.unsubscribe();
    this.valueOptionsChanges$.unsubscribe();
    this.valueRemovalInfosChanges$.unsubscribe();
    this.valueRecipientInfosChanges$.unsubscribe();
  }

  storeSelect() {
    this.removals$ = this.store.select('removals');
    this.recipients$ = this.store.select('recipients');
    this.order$ = this.store.select('order');
  }
  storeDispatch() {
    //this.store.dispatch({type: CustomerActions.GET_CUSTOMER, payload: this.customerId });
    // this.store.dispatch(new OrderActions.InitOrder(this.customerId));
    this.store.dispatch(new RemovalActions.GetRemovals(this.customerId*10+1)); // (id + type)  eg: id = 69; type=1 fk_type=691
    this.store.dispatch(new RecipientActions.GetRecipients(this.customerId*10+2)); // (id + type)  eg: id = 69; type=2 fk_type=692
  }


  onValueOrderChanged() {
    this.valueRemovalChanges$ = this.formRemoval.get('id').valueChanges.subscribe(val => {
      this.store.dispatch(new OrderActions.EditOrderRemoval(val));
      this.chackIsFormAsValue(val);
    });
    this.valueRecipientChanges$ = this.formRecipient.get('id').valueChanges.subscribe(val => {
      this.store.dispatch(new OrderActions.EditOrderRecipient(val));
      this.chackIsFormAsValue(val);
    });
    this.valueOptionsChanges$ = this.formOptions.valueChanges.subscribe(val => {
      this.store.dispatch(new OrderActions.EditOrderOption(val));
      this.chackIsFormAsValue(val);
    });
    this.valueRemovalInfosChanges$ = this.formRemoval.get('infos').valueChanges.subscribe(val => {
      this.store.dispatch(new OrderActions.EditOrderRemovalInfos(val));
      this.chackIsFormAsValue(val.info1, val.info2);
    });
    this.valueRecipientInfosChanges$ = this.formRecipient.get('infos').valueChanges.subscribe(val => {
      this.store.dispatch(new OrderActions.EditOrderRecipientInfos(val));
      this.chackIsFormAsValue(val.info1, val.info2);
    });
  }

  chackIsFormAsValue(...val) {
    // console.log('form as value', val);
    if(!this.arrayAsValue(val)) {
      this.markAsPristine();
    }else{
      this.markAsDirty();
    }
  }

  arrayAsValue(array): number {
    return array.filter(v => {
      return v.length;
    }).length
  }

  markAsDirty() {
    console.log('** dirty');
    this.formRecipient.markAsDirty();
    this.formRemoval.markAsDirty();
  }

  markAsPristine() {
    console.log('** pristine');
    this.formRemoval.markAsPristine();
    this.formRecipient.markAsPristine();
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
        info1: ['', { updateOn: 'blur', validators: [Validators.required]} ],
        info2: ['', { updateOn: 'blur', validators: [Validators.required]} ],
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
        info1: ['', { updateOn: 'blur', validators: [Validators.required]} ],
        info2: ['', { updateOn: 'blur', validators: [Validators.required]} ],
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

  canDeactivate(): boolean {
    console.log("canDeactivate : is form formRemoval.pristine :" + this.formRemoval.pristine );
    // console.log("canDeactivate : is form formRecipient.pristine :" + this.formRecipient.pristine );
    return  this.formRemoval.pristine && this.formRecipient.pristine;
  }
  isFormsValide(): boolean {
    return  this.formRemoval.valid && this.formRecipient.valid;
  }
  resetOrder(){
    this.store.dispatch(new OrderActions.InitOrder(this.customerId));
    this.markAsPristine();
  }
  recapOrder() {
    this.store.dispatch(new OrderActions.SaveOrder());
    // let orderSave$ = this.store.select((s: AppState) => s.order).subscribe(s =>   {
    //   console.log("-----------",s);
    //   this.store.dispatch(new OrderActions.SaveOrder(s));
    //   // orderSave$.unsubscribe();
    // });
    //   //
  }

  success() {
    this.notificationsService.notify('success', 'some alert', 'push was called!');
  }

  info() {
    this.notificationsService.notify('info', 'some alert', 'push was called!');
  }
  warn() {
    this.notificationsService.notify('warn', 'some alert', 'push was called!');
  }

  error() {
    this.notificationsService.notify('error', 'some alert', 'push was called!');
  }

}
