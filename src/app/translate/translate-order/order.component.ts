import {Component, OnInit, HostListener} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";
import {ComponentDeactivable} from "../../services/can-deactivate-form-guard.service";
import * as uuid from 'uuid';
import {Store, select} from "@ngrx/store";
import {
  RootStoreState,
  OrderTranslateStoreActions,
  OrderTranslateSelectors
} from '../root-store';
import {OrderTranslate} from "../../models/translate";
import {CustomerService} from "../../services/customer.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-order',
  templateUrl: 'order.component.html',
  styleUrls: ['order.component.css']
})
export class OrderComponent implements OnInit, ComponentDeactivable {

  myOrderForm: FormGroup;
  myOrderFormTemp: FormGroup;
  isLinear = false;
  order: OrderTranslate;
  orderTemp: OrderTranslate;
  customerId: number;
  cptDestinationChecked: number;
  error$: Observable<string>;
  get arrayFormDataStep2() { return <FormArray>this.myOrderForm.get(['step2','destination']); }
  get arrayFormDataStep3() { return <FormArray>this.myOrderForm.get(['step3','destination']); }

  constructor(private fb: FormBuilder,
              private store$: Store<RootStoreState.RootState>,
              private customerService: CustomerService) {
    this.cptDestinationChecked = 0;
    this.customerService.currentCustomerId.subscribe(id => {
      if(+id !== 0) {

      }
    });
    this.customerId = 1;
    this.createForm();
    this.onChanges();
  }

  ngOnInit() {
    this.error$ = this.store$.pipe(
      select( OrderTranslateSelectors.selectOrderTranslateError )
    );
  }

  onChanges(): void {
    this.myOrderForm.get(['step2', 'communeCheck']).valueChanges.subscribe(val => {
      if (val) {
        this.addItem('step2', 'commune', 0);
      }else {
        this.removeItem('step2', 'commune');
      }
    });
    this.myOrderForm.get(['step2', 'notaireCheck']).valueChanges.subscribe(val => {
      if (val) {
        this.addItem('step2', 'notaire', 1);
      }else {
        this.removeItem('step2', 'notaire');
      }
    });
    this.myOrderForm.get(['step2', 'consulatCheck']).valueChanges.subscribe(val => {
      if (val) {
        this.addItem('step2', 'consulat', 2);
      }else {
        this.removeItem('step2', 'consulat');
      }
    });
  }

  createForm(): void {
    this.myOrderForm = this.fb.group({
      step0: this.fb.group({
        id: [null],
        uuid: [uuid.v4(), Validators.required],
        created: [null],
        valid: [null],
        price: [null],
        fk_client_id: [this.customerId, Validators.required]
      }),
      step1: this.fb.group({
        country: [null, Validators.required],
        reference: [null, Validators.required],
        docName: [null, Validators.required],
        originalNbr: [null],
        translateNbr: [null],
        copyNbr: [null],
        originalCheck: [null],
        translateCheck: [null],
        copyCheck: [null]
      }),
      step2: this.fb.group({
        greffeInstanceCheck: [null],
        coursAppelCheck: [null],
        spfEtrangereCheck: [null],
        spfJusticeCheck: [null],
        communeCheck: [null],
        consulatCheck: [null],
        notaireCheck: [null],
        destination: this.fb.array([ ])
      }),
      step3: this.fb.group({
        procedureType: [null, Validators.required], // normal/urgent
        destination: this.fb.array([
          this.createItem('removal'),
          this.createItem('recipient')
        ])
      })
    });
  }
  addItem(step: string, kind: string, index: number): void {
    let items = this.myOrderForm.get([step, 'destination']) as FormArray;
    items.insert(index, this.createItem(kind));
  }
  removeItem(step: string, kind: string): void {
    let items = this.myOrderForm.get([step, 'destination']) as FormArray;
    let i = 0;
    for (let item of items.controls) {
      if (item.get('kind').value === kind) {
        items.removeAt(i);
        break;
      }
        i++;
    }
  }
  createItem(kind: string): FormGroup {
    return this.fb.group({
      id: [null],
      orderType: ['translate', Validators.required], // translate/import-export
      kind: [kind, Validators.required], // removal/recipient/commune/notaire
      name: [null, Validators.required],
      contact: [null],
      phone: [null, Validators.required],
      message: [null],
      fk_uuid: [null],// uuid_translate/uuid_import-export
      address: [null, Validators.required],
      number: [null, Validators.required],
      cp: [null, Validators.required],
      state: [null, Validators.required]
    })

  }
  @HostListener('window:beforeunload')
  canDeactivate(): boolean {
    let canDeactive = true;
      if (this.myOrderForm.dirty && this.myOrderForm.touched) {
        canDeactive = false;
      }
    return canDeactive;
  }
  send() {
    this.mapFormToOrderTranslate();
    this.store$.dispatch( new OrderTranslateStoreActions.AddRequestAction({item: this.order}) );
  }
  mapFormToOrderTranslate() {
    this.order = {
      ...this.myOrderForm.get('step0').value,
      ...this.myOrderForm.get('step1').value,
      ...this.myOrderForm.get('step2').value,
      ...this.myOrderForm.get('step3').value
    };
    let dest1 = this.myOrderForm.get(['step2', 'destination']).value;
    let dest2 = this.myOrderForm.get(['step3', 'destination']).value;
    this.order.destination = [
      ...dest1, ...dest2
    ];
  }
  incDestination(value) {
    if (value) {
      this.cptDestinationChecked++
    } else {
      this.cptDestinationChecked--;
    }
  }

  initiateTemp(value) {
    this.myOrderFormTemp = value;
    this.myOrderFormTemp  = this.removeEmpty(this.myOrderFormTemp.value)
  }
  removeEmpty(obj: any): any {
    Object.keys(obj).forEach((key) => {
      if (obj[key] && typeof obj[key] === 'object') {
        const childObject = this.removeEmpty(obj[key]);
        if (childObject === undefined) {
          delete obj[key];
        }
      } else if (obj[key] === '' || obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      }
    });
    let resp =  Object.keys(obj).length > 0 || obj instanceof Array ? obj : undefined;
    console.log(resp);
    return resp;
  };
}
