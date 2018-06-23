import {Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/skipWhile'
import 'rxjs/add/operator/map';

import * as RemovalActions from '../actions/removal.actions';
import * as RecipientActions from '../actions/recipient.actions';
import * as OrderActions from '../actions/purchasseOrder.actions';
import * as PrixZoneMotoActions from '../actions/prixZoneMoto.actions';
import * as PrixZoneCamionnetteActions from '../actions/prixZoneCamionnette.actions';
import * as ContactActions from '../actions/contact.actions';

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
import {PrixZone} from "../models/prixZone";
import {Contact} from "../models/contact";

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
  prixZoneMoto$: Observable<PrixZone>;
  prixZoneCamionnette$: Observable<PrixZone>;
  contact$: Observable<Contact[]>;

  private distance: Distance;
  distances: Distance[] = [];
  datas: any;
  nameForm = ['removals','recipients'];
  showSendBtn = false;

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
  private idClient: any;

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
    this.idClient = this.route.snapshot.data.id;
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
    this.prixZoneMoto$ = this.store.select(fromRoot.selectors.getPrixZoneMotoData);
    this.prixZoneCamionnette$ = this.store.select(fromRoot.selectors.getPrixZoneCamionnetteData);
    this.contact$ = this.store.select(fromRoot.selectors.getContactData);
  }
  storeDispatch() {
    this.customerService.currentCustomerId.subscribe(id => {
      if(id !== 0) {
        this.customerId = id;
        this.store.dispatch(new RemovalActions.GetRemovals(this.customerId*10+1)); // (id + type)  eg: id = 69; type=1 fk_type=691
        this.store.dispatch(new RecipientActions.GetRecipients(this.customerId*10+2)); // (id + type)  eg: id = 69; type=2 fk_type=692
        this.store.dispatch(new PrixZoneMotoActions.GetPrixZoneMoto({id: this.customerId, table: 'moto'}));
        this.store.dispatch(new PrixZoneCamionnetteActions.GetPrixZoneCamionnette({id: this.customerId, table: 'camionnette'}));
        this.store.dispatch(new ContactActions.GetContact());
      }
    });
    // this.store.dispatch(new ClientZonesActions.GetClientZones());
  }
  pushAllForms(allFormGroup: FormGroup[]): FormGroup[] {
    allFormGroup.push(this.formRemoval);
    allFormGroup.push(this.formRecipient);
    allFormGroup.push(this.formOptions);
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
        this.store.dispatch(new OrderActions.EditOrderDistance(val));
    });
  }
  resetDistance() {
    this.formDistance.reset();
    this.distances = [];
    this.cdr.detectChanges();
    this.showSendBtn = false;
    this.cdr.detectChanges();
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
      clientZone: [0, Validators.required],
      phone: ['', Validators.required],
      infos: this.fb.group({
        info1: ['', { updateOn: 'blur'} ],
        info2: ['', { updateOn: 'blur'} ],
      }),
      type: ['', Validators.required],
      fk_client: ['', Validators.required],
      active: ['', Validators.required],
      created: ['', Validators.required],
      fk_type: ['', Validators.required],
      addressValidated: ['']
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
      clientZone: [0, Validators.required],
      phone: ['', Validators.required],
      infos: this.fb.group({
        info1: ['', { updateOn: 'blur'} ],
        info2: ['', { updateOn: 'blur'} ],
      }),
      type: ['', Validators.required],
      fk_client: ['', Validators.required],
      active: ['', Validators.required],
      created: ['', Validators.required],
      fk_type: ['', Validators.required],
      addressValidated: ['']
    });
  }
  initFormsOptions(): void {
    this.formOptions = this.fb.group({
      options: ['express', Validators.required],
      tomorrow: [false],
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
    return valid;
  }
  resetOrder() {
    this.allFormGroup.forEach( form => {
      form.reset();
    });
    this.store.dispatch(new OrderActions.InitOrder(this.customerId));
    this.resetDistance();
  }

  addContacts(removalForm: FormGroup, recipientForm: FormGroup): void {
    const c1 = removalForm.get('infos.info1').value;
    let removC = null;
    if (c1 && c1.length > 2) {
      removC  = {
        name: c1,
        fk_client_id: removalForm.get('fk_client').value,
        fk_resp_dest_id: removalForm.get('id').value}
    }
    const c2 = recipientForm.get('infos.info1').value;
    let recipC = null;
    if (c2 && c2.length > 2) {
      recipC  = {
        name: c2,
        fk_client_id: recipientForm.get('fk_client').value,
        fk_resp_dest_id: recipientForm.get('id').value}
    }
      this.store.dispatch(new ContactActions.AddContacts([removC, recipC]));
  }

  recapOrder() {
    this.store.dispatch(new OrderActions.SaveOrder());
    this.addContacts(this.formRemoval, this.formRecipient);
    this.resetOrder();

  }
  isAllComplete(emitted?: any): void {
    if (emitted && this.isFormsValide()) {
       this.calculDistance();
    }
  }
  calculDistance(): void {
    if (this.isNational()) {
      this.calculDistancesNational();
    }else{
      this.calculPriceBxl();
    }
    this.showSendBtn = true;
    this.cdr.markForCheck();
  }
  isNational(): boolean  {
    return +this.formRemoval.get('clientZone').value === 0 || +this.formRecipient.get('clientZone').value === 0;
  }
  calculDistancesNational(): void {
    if (this.distances.length < 2) {
        this.setDistance(this.getRespgoogleMapDistanceMatrixOrigin(), this.nameForm[0]);
        this.setDistance(this.getRespgoogleMapDistanceMatrixDestinataire(), this.nameForm[1]);
    }
  }
  calculPriceBxl(): void  {
    // prendre le prix de zone la plus grande
    let zone: number;
    if (this.formRemoval.get('clientZone').value > this.formRecipient .get('clientZone').value) {
      zone = +this.formRemoval.get('clientZone').value;
    }else{
      zone = +this.formRecipient.get('clientZone').value;
    }

    // calcul options
    if(this.formOptions.get('transport').value === 'moto') {
      this.calculTransportAndOptionBxl(this.prixZoneMoto$, zone);
    }else if(this.formOptions.get('transport').value === 'voiture') {
      this.calculTransportAndOptionBxl(this.prixZoneCamionnette$, zone);
    }
    // after15h
    //
  }

  calculTransportAndOptionBxl(prixZoneTransport: Observable<PrixZone>, zone: number): void {
    prixZoneTransport.subscribe(data => {
      let price = +data['zone'+zone];
      if(this.formOptions.get('options').value === 'double_express') {
        price +=  (price * (+data.double_express) / 100);
      }
      else if(this.formOptions.get('options').value === 'go_and_back') {
        price +=  (price * (+data.go_and_back) / 100);
      }
      if (''+data.after15h !== '0') {
        const after15H  = (+data['zone'+zone])*(+data.after15h);
        price = price + after15H;
      }
      this.formDistance.patchValue({
        price: price.toFixed(2),
        distance: '',
        elapse_time: '',
        status: 'Zone origine: ' + this.formRemoval.get('clientZone').value + ' To zone dest: ' + this.formRecipient.get('clientZone').value
      });
    });
  }

  calculTransportAndOptionNational(prixZoneTransport: Observable<PrixZone>, price: number): void {
  prixZoneTransport.subscribe(data => {
    price *= data.prixKm;
    if(this.formOptions.get('options').value === 'double_express') {
      price +=  (price * data.double_express / 100);
    }
    else if(this.formOptions.get('options').value === 'go_and_back') {
      price +=  (price * data.go_and_back / 100);
    }
    this.formDistance.patchValue({
      price: price.toFixed(2)
    });
  });
}
  calculPriceNational() {
  // set distance total +10km *2
    let distM = 0;
    this.distances.map(w => { distM += w.distanceValue; });
    distM += 10000;
    distM *= 2;
    let distKm = distM / 1000;
    let price = distKm;

    if(this.formOptions.get('transport').value === 'moto') {
      this.calculTransportAndOptionNational(this.prixZoneMoto$, price);
    }else if(this.formOptions.get('transport').value === 'voiture') {
      this.calculTransportAndOptionNational(this.prixZoneCamionnette$, price);
    }

    let time = 0;
    this.distances.map(w => { time += w.durationValue;  });
    let status = '';
    this.distances.map(w => { status += w.whichForm + ':' + w.status + ' ';  });

    this.formDistance.patchValue({
      distance: distKm,
      elapse_time: time,
      status: status
    });
  }

  // distance
  setDistance(respGoogleMatrix: any, whichForm: string ): void {
       respGoogleMatrix.then(result => {
         if (this.distances.length < 2) {
         // if (true) {
           const respStatus = result.distance.rows["0"].elements["0"].status;
           if (respStatus === CONST.DIST_MATRIX_OK) {
             this.distance = {
               price: 0,
               distanceText: result.distance.rows["0"].elements["0"].distance.text,
               distanceValue: result.distance.rows["0"].elements["0"].distance.value,
               durationText: result.distance.rows["0"].elements["0"].duration.text,
               durationValue: result.distance.rows["0"].elements["0"].duration.value,
               status: result.distance.rows["0"].elements["0"].status,
               whichForm: whichForm,
               way:  ' orig: ' + result.distance.originAddresses[0] + ' dest: ' +  result.distance.destinationAddresses[0]
             };

           }
           else if (respStatus === CONST.DIST_MATRIX_NOT_FOUND) {
             console.log(respStatus);
             this.distance = {
               price: 0,
               distanceText: 'error',
               distanceValue: 0,
               durationText: 'error',
               durationValue: 0,
               status: result.distance.rows["0"].elements["0"].status,
               whichForm: whichForm,
               way:  ' orig: ' + result.distance.originAddresses[0] + ' dest: ' +  result.distance.destinationAddresses[0]
             };
           }
           if (this.distances.filter(w => (w.whichForm === whichForm)).length === 0) {
             this.distances.push(this.distance);
             this.cdr.markForCheck();
             if (this.distances.length === 2) {
               // if (true) {
               this.calculPriceNational();
             }
           }
         }
        }).catch(error => {
         // this.resetDistance();
          console.log('error setDistance: ', error);
        });
       // due many callback call issue
  }
  getRespgoogleMapDistanceMatrixDestinataire(): any {
    return this.getDistanceMatrixService.googleMapDistanceMatrixService (
      {
        address: this.allFormGroup[0].get('address').value,
        number: this.allFormGroup[0].get('number').value,
        cp: this.allFormGroup[0].get('cp').value,
        state: this.allFormGroup[0].get('state').value,
        country: ''
      },
      {
        address: this.allFormGroup[1].get('address').value,
        number: this.allFormGroup[1].get('number').value,
        cp: this.allFormGroup[1].get('cp').value,
        state: this.allFormGroup[1].get('state').value,
        country: ''
      });
  }
  getRespgoogleMapDistanceMatrixOrigin(): any {
    return this.getDistanceMatrixService.googleMapDistanceMatrixService (
      {
        address: 'Rue des Alexiens',
        number: 73,
        cp: 1000,
        state: 'Bruxelles',
        country: 'Belgique'
      },
      {
        address: this.allFormGroup[0].get('address').value,
        number: this.allFormGroup[0].get('number').value,
        cp: this.allFormGroup[0].get('cp').value,
        state: this.allFormGroup[0].get('state').value,
        country: ''
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
