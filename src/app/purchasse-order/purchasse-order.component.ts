import {  Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as RemovalActions from '../actions/removal.actions';
import * as RecipientActions from '../actions/recipient.actions';
import * as OrderActions from '../actions/purchasseOrder.actions';

import {DataForm} from '../models/DataForm';
import {PurchasseOrder} from '../models/PurchasseOrder';
import {ComponentDeactivable} from '../services/can-deactivate-form-guard.service';
import * as fromRoot from '../shared/appState';
import {} from '@types/googlemaps';
import {GetDistanceMatrixService} from "../services/google/get-distance-matrix.service";
import {Distance} from "../models/distance";
import * as CONST from '../models/googleMatrixStatus';
import {CustomerService} from "../services/customer.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-purchasse-order',
  templateUrl: './purchasse-order.component.html',
  styleUrls: ['./purchasse-order.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PurchasseOrderComponent implements OnInit, OnDestroy, ComponentDeactivable {

  removals$: Observable<DataForm[]>;
  recipients$: Observable<DataForm[]>;
  order$: Observable<PurchasseOrder>;

  formRemoval: FormGroup;
  formRecipient: FormGroup;
  formOptions: FormGroup;
  formDistance: FormGroup;
  private allFormGroup: FormGroup[] = [];

  private valueRemovalChanges$;
  private valueRecipientChanges$;
  private valueOptionsChanges$;
  private valueRemovalInfosChanges$;
  private valueRecipientInfosChanges$;
  private customerId: number;
  resp: any;
  distance: Distance;
  datas: any;
  nameForm = ['removal','recipient'];
  private isDistance = false;

  data: any;

  constructor (
    private store: Store<fromRoot.AppState>,
    private fb: FormBuilder,
    private getDistanceMatrixService: GetDistanceMatrixService,
    private cdr: ChangeDetectorRef,
    private customerService: CustomerService,
    private route: ActivatedRoute)
  {
    this.storeDispatch();
    this.initFormsRemoval();
    this.initFormsRecipient();
    this.initFormsOptions();
    this.initFormsDistance();
  }

  ngOnInit() {
    this.data = this.route.snapshot.data;
    this.storeSelect();
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
    this.removals$ = this.store.select(fromRoot.selectors.getRemovalsData);
    this.recipients$ = this.store.select(fromRoot.selectors.getRecipientsData);
    this.order$ = this.store.select(fromRoot.selectors.getOrder);
    // this.clientZones$ = this.store.select(fromRoot.selectors.getClientZonesData);
  }
  storeDispatch() {
    this.customerService.currentCustomerId.subscribe(id => {
      if(id !== 0) {
        this.customerId = id;
        this.store.dispatch(new RemovalActions.GetRemovals(this.customerId*10+1)); // (id + type)  eg: id = 69; type=1 fk_type=691
        this.store.dispatch(new RecipientActions.GetRecipients(this.customerId*10+2)); // (id + type)  eg: id = 69; type=2 fk_type=692
      }
    });
    // this.store.dispatch(new ClientZonesActions.GetClientZones());
  }
  pushAllForms(allFormGroup: FormGroup[]): FormGroup[] {
    allFormGroup.push(this.formRemoval);
    allFormGroup.push(this.formRecipient);
    allFormGroup.push(this.formOptions);
    // allFormGroup.push(this.formDistance);
    return allFormGroup;
  }
  onValueOrderChanged() {
    this.valueRemovalChanges$ = this.formRemoval.get('id').valueChanges.subscribe(val => {
      this.resetDistance();
      this.store.dispatch(new OrderActions.EditOrderRemoval(val));
    });
    this.valueRecipientChanges$ = this.formRecipient.get('id').valueChanges.subscribe(val => {
      this.resetDistance();
      this.store.dispatch(new OrderActions.EditOrderRecipient(val));
    });
    this.valueRemovalInfosChanges$ = this.formRemoval.get('infos').valueChanges.subscribe(val => {
      this.store.dispatch(new OrderActions.EditOrderRemovalInfos(val));
    });
    this.valueRecipientInfosChanges$ = this.formRecipient.get('infos').valueChanges.subscribe(val => {
      this.store.dispatch(new OrderActions.EditOrderRecipientInfos(val));
    });
    this.valueOptionsChanges$ = this.formOptions.valueChanges.subscribe(val => {
      this.resetDistance();
      this.store.dispatch(new OrderActions.EditOrderOption(val));
    });
    this.formRemoval.valueChanges.subscribe(val => {
      this.chackIsFormAsValue(this.formRemoval, val);
    });
    this.formRecipient.valueChanges.subscribe(val => {
      this.chackIsFormAsValue(this.formRecipient, val);
    });
    this.formDistance.valueChanges.subscribe(val => {
      if (val.status && val.status.length) {
        this.store.dispatch(new OrderActions.EditOrderDistance(val));
      }
    });
  }
  resetDistance() {
    this.isDistance = false;
    this.distance = null;
    this.formDistance.reset();
  }
  chackIsFormAsValue(form, ...val) {
    const flattenObject = this.flattenObject(form.value);
    if (!this.isChangedValuesIsNotEmpty(flattenObject)) {
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
        if (object[prop]) {
          if (object[prop].length) {
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
      ref_client: [''],
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

      price: [''],
      distance: [''],
      elapse_time: [''],
    });
  }
  initFormsRecipient(): void {
    this.formRecipient = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      ref_client: [''],
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
      tomorrow: [false, Validators.required],
      transport: ['moto', Validators.required]
    });
  }
  initFormsDistance(): void {
    this.formDistance = this.fb.group({
      price: [{value: null, disabled: true}, Validators.required],
      distance: [{value: null, disabled: true}, Validators.required],
      elapse_time: [{value: null, disabled: true}, Validators.required],
      status: [{value: null, disabled: true}, Validators.required]
    });
  }
  @HostListener('window:beforeunload')
  canDeactivate(): boolean {
    let canDeactive = true;
    this.allFormGroup.forEach( form => {
      if (form.dirty && form.touched) {
        canDeactive = false;
      }
    });
    return canDeactive;
  }
  isFormsValide(): boolean {
    let valid = true;
    this.allFormGroup.forEach( form => {
      if (!form.valid) {
        valid = false;
      }
    });
    this.setDistance(valid);
    return valid;
  }
  resetOrder() {
    this.store.dispatch(new OrderActions.InitOrder(this.customerId));
  }
  recapOrder() {
    this.store.dispatch(new OrderActions.SaveOrder());
  }

  // distance
  setDistance(valid: boolean): void {
    if (valid && !this.isDistance) {
      this.resp = this.getRespgoogleMapDistanceMatrix();
       this.resp.then(result => {
          if (result.distance.rows["0"].elements["0"].status === CONST.DIST_MATRIX_OK) {
            this.distance = {
              price: 5,
              distanceText: result.distance.rows["0"].elements["0"].distance.text,
              distanceValue: result.distance.rows["0"].elements["0"].distance.value,
              durationText: result.distance.rows["0"].elements["0"].duration.text,
              durationValue: result.distance.rows["0"].elements["0"].duration.value,
              status: result.distance.rows["0"].elements["0"].status
            };
            this.cdr.markForCheck();
          }else {
            this.distance = {
              price: 0,
              distanceText: '',
              distanceValue: 0,
              durationText: '',
              durationValue: 0,
              status: result.distance.rows["0"].elements["0"].status
            };
            this.cdr.markForCheck();
          }
         this.formDistance.setValue({
           price: this.distance.price,
           distance: this.distance.distanceValue,
           elapse_time: this.distance.durationValue,
           status: this.distance.status
         });
         this.cdr.markForCheck();
         this.isDistance = true;
         this.cdr.markForCheck();
        }).catch(error => {
          this.isDistance = false;
          console.log('error setDistance: ', error);
        });
       // due many callback call issue

    }
  }
  getRespgoogleMapDistanceMatrix(): any {
    return this.getDistanceMatrixService.googleMapDistanceMatrixService (
      {
        address: this.allFormGroup[0].get('address').value,
        number: this.allFormGroup[0].get('number').value,
        cp: this.allFormGroup[0].get('cp').value,
        state: this.allFormGroup[0].get('state').value,
        city: 'Belgique'
      },
      {
        address: this.allFormGroup[1].get('address').value,
        number: this.allFormGroup[1].get('number').value,
        cp: this.allFormGroup[1].get('cp').value,
        state: this.allFormGroup[1].get('state').value,
        city: 'Belgium'
      });
  }

  // success() {
  //   this.notificationsService.notify('success', 'some alert', 'push was called!');
  // }
  // info() {
  //   this.notificationsService.notify('info', 'some alert', 'push was called!');
  // }
  // warn() {
  //   this.notificationsService.notify('warn', 'some alert', 'push was called!');
  // }
  // error() {
  //   this.notificationsService.notify('error', 'some alert', 'push was called!');
  // }

}
