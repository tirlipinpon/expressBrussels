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
import * as _ from "lodash";

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
  private allFormGroup: FormGroup[] = [];

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
    this.allFormGroup = this.pushAllForms(this.allFormGroup);
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

  pushAllForms(allFormGroup: FormGroup[]): FormGroup[] {
    allFormGroup.push(this.formRemoval);
    allFormGroup.push(this.formRecipient);
    allFormGroup.push(this.formOptions);
    return allFormGroup;
  }

  onValueOrderChanged() {
    this.valueRemovalChanges$ = this.formRemoval.get('id').valueChanges.subscribe(val => {
      this.store.dispatch(new OrderActions.EditOrderRemoval(val));
    });
    this.valueRecipientChanges$ = this.formRecipient.get('id').valueChanges.subscribe(val => {
      this.store.dispatch(new OrderActions.EditOrderRecipient(val));
    });
    this.valueRemovalInfosChanges$ = this.formRemoval.get('infos').valueChanges.subscribe(val => {
      this.store.dispatch(new OrderActions.EditOrderRemovalInfos(val));
    });
    this.valueRecipientInfosChanges$ = this.formRecipient.get('infos').valueChanges.subscribe(val => {
      this.store.dispatch(new OrderActions.EditOrderRecipientInfos(val));
    });
    this.valueOptionsChanges$ = this.formOptions.valueChanges.subscribe(val => {
      this.store.dispatch(new OrderActions.EditOrderOption(val));
    });
    this.formRemoval.valueChanges.subscribe(val => {
      this.chackIsFormAsValue(this.formRemoval, val);
    });
    this.formRecipient.valueChanges.subscribe(val => {
      this.chackIsFormAsValue(this.formRecipient, val);
    });
  }

  chackIsFormAsValue(form, ...val) {
    const flattenObject = this.flattenObject(form.value);
    if(!this.isChangedValuesIsNotEmpty(flattenObject)) {
      this.markAsPristine(form);
    }
  }
  flattenObject(ob) {
    let toReturn = {};
    for (let i in ob) {
      if (!ob.hasOwnProperty(i)) continue;
      if ((typeof ob[i]) == 'object') {
        let flatObject = this.flattenObject(ob[i]);
        for (let x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;
          // toReturn[i + '.' + x] = flatObject[x];
          toReturn[x] = flatObject[x];
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
  };
  isChangedValuesIsNotEmpty(object): boolean {
    let asValue = false;
      for (let prop in object) {
        if(object[prop]) {
          if(object[prop].length) {
            asValue = true;
          }
        }
    }
    // console.log('as value= ', asValue);
    return asValue;
  }
  markAsPristine(form: FormGroup) {
    // console.log('** pristine && untouched');
    form.markAsPristine();
    form.markAsUntouched();
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
    let canDeactive = true;
    this.allFormGroup.forEach( form => {
      if(form.dirty && form.touched) {
        canDeactive = false;
      }
    });
    return canDeactive;
  }
  isFormsValide():boolean {
    let valid = true;
    this.allFormGroup.forEach( form => {
      if(!form.valid) {
        valid = false;
      }
    });
    return valid;
  }
  resetOrder(){
    this.store.dispatch(new OrderActions.InitOrder(this.customerId));
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
