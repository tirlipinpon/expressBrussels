import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {ImportExport} from "../../models/import-export";
import {Store} from "@ngrx/store";
import {
  RootStoreState,
  ImportExportStoreActions,
  ImportExportStoreSelectors
} from '../root-store';
import {FormBuilder, Validators, FormGroup, FormArray} from "@angular/forms";
import * as uuid from 'uuid';
import {CustomerService} from "../../services/customer.service";
import {MatStepper} from "@angular/material";

@Component({
  selector: 'app-i-e-order',
  templateUrl: './i-e-order.component.html',
  styleUrls: ['./i-e-order.component.css']
})
export class IEOrderComponent implements OnInit {

  importExportItems$: Observable<ImportExport[]>;
  error$: Observable<string>;
  ieForm: FormGroup;
  order: ImportExport;
  customerId: number;
  isAtLeasOneAdminCheck: number;
  @ViewChild('stepper') stepper: MatStepper;
  get arrayFormDataStep1() { return <FormArray>this.ieForm.get(['step1', 'administration']); }
  get arrayFormDataStep2() { return <FormArray>this.ieForm.get(['step2', 'destination']); }

  constructor(private store$: Store<RootStoreState.RootState>,
              private fb: FormBuilder,
              private customerService: CustomerService) {
    this.customerService.currentCustomerId.subscribe(id => {
      if(+id !== 0) {
        this.customerId = +id;
      }
    });
    this.createForm();
    this.addItemAdmin();
    this.onChanges();
  }

  ngOnInit() {
    // this.store$.dispatch( new ImportExportStoreActions.AddRequestAction({item: null}) );
    this.isAtLeasOneAdminCheck = 0;
  }
  addItemAdmin() {
    this.addItem('step1', 'beci', 0);
    this.addItem('step1', 'traduction', 1);
    this.addItem('step1', 'spfae', 2);
    this.addItem('step1', 'afsca', 3);
    this.addItem('step1', 'chambrebelgo', 4);
    this.addItem('step1', 'ambassade', 5);
  }
  onChanges(): void {


    this.ieForm.get(['step1', 'adminName', 'beci']).valueChanges.subscribe(val => {
      if (val) {
        this.isAtLeasOneAdminCheck++;
        this.enable('step1', 'beci', 0);
      }else {
        this.isAtLeasOneAdminCheck--;
        this.disable('step1', 'beci', 0);
      }
    });
    this.ieForm.get(['step1', 'adminName', 'traduction']).valueChanges.subscribe(val => {
      if (val) {
        this.isAtLeasOneAdminCheck++;
        this.enable('step1', 'traduction', 1);
      }else {
        this.isAtLeasOneAdminCheck--;
        this.disable('step1', 'traduction', 1);
      }
    });
    this.ieForm.get(['step1', 'adminName', 'spfae']).valueChanges.subscribe(val => {
      if (val) {
        this.isAtLeasOneAdminCheck++;
        this.enable('step1', 'spfae',  2);
      }else {
        this.isAtLeasOneAdminCheck--;
        this.disable('step1', 'spfae', 2);
      }
    });
    this.ieForm.get(['step1', 'adminName', 'afsca']).valueChanges.subscribe(val => {
      if (val) {
        this.isAtLeasOneAdminCheck++;
        this.enable('step1', 'afsca',  3);
      }else {
        this.isAtLeasOneAdminCheck--;
        this.disable('step1', 'afsca', 3);
      }
    });
    this.ieForm.get(['step1', 'adminName', 'chambrebelgo']).valueChanges.subscribe(val => {
      if (val) {
        this.isAtLeasOneAdminCheck++;
        this.enable('step1', 'chambrebelgo',  4);
      }else {
        this.isAtLeasOneAdminCheck--;
        this.disable('step1', 'chambrebelgo', 4);
      }
    });
    this.ieForm.get(['step1', 'adminName', 'ambassade']).valueChanges.subscribe(val => {
      if (val) {
        this.isAtLeasOneAdminCheck++;
        this.enable('step1', 'ambassade', 5);
      }else {
        this.isAtLeasOneAdminCheck--;
        this.disable('step1', 'ambassade', 5);
      }
    });
  }
  addItem(step: string, kind: string, index: number): void {
    let items = this.ieForm.get([step, 'administration']) as FormArray;
    items.insert(index, this.createItem(kind));
    this.disable(step, kind, index);
  }
  disable(step: string, kind: string, index: number) {
    let items = this.ieForm.get([step, 'administration']) as FormArray;
    items.at(index).reset();
    items.at(index).get('kind').patchValue(kind);
    items.at(index).disable();
  }
  enable(step: string, kind: string,  index: number) {
    let items = this.ieForm.get([step, 'administration']) as FormArray;
    items.at(index).enable();
  }
  removeItem(step: string, kind: string): void {
    let items = this.ieForm.get([step, 'administration']) as FormArray;
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
      kind: [kind],
      certifCheck: [null],
      annexeCheck: [null],
      copyCheck: [null],
      invoicesCheck: [null],
      copyInvoicesCheck: [null],
    })
  }
  createForm() {
    this.ieForm =  this.fb.group({
      step0: this.fb.group({
        id: [null],
        uuid: [uuid.v4(), Validators.required],
        price: [null],
        valid: [null],
        fk_client_id: [this.customerId, Validators.required],
        created: [null]
      }),
      step1: this.fb.group({
        country: [null, Validators.required],
        reference: [null, Validators.required],
        adminName: this.fb.group({
          beci: [null],
          traduction: [null],
          spfae: [null],
          afsca: [null],
          chambrebelgo: [null],
          ambassade: [null]
        }),
        administration: this.fb.array([ ])
      }),
      step2: this.fb.group({
        procedureType: [null, Validators.required], // normal/urgent
        destination: this.fb.array([
          this.createItemDest('removal'),
          this.createItemDest('recipient')
        ])
      })
    });
  }
  createItemDest(kind: string): FormGroup {
    return this.fb.group({
      id: [null],
      orderType: ['import-export', Validators.required], // translate/import-export
      kind: [kind, Validators.required], // removal/recipient
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
  mapFormToOrderTranslate() {
    this.order = {
      ...this.ieForm.get('step0').value,
      ...{country: this.ieForm.get(['step1', 'country']).value},
      ...{reference: this.ieForm.get(['step1', 'reference']).value},
      ...{administration: this.ieForm.get(['step1', 'administration']).value},
      ...this.ieForm.get('step2').value
    };
    let dest1 = this.ieForm.get(['step2', 'destination']).value;
    this.order.destinations = [
      ...dest1
    ];
    delete this.order.adminName;
  }
  send(): void {
    this.mapFormToOrderTranslate();
    this.store$.dispatch( new ImportExportStoreActions.AddRequestAction({item: this.removeEmpty(this.order)}) );
    this.stepper.reset();
    this.isAtLeasOneAdminCheck = 0;
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
    return  Object.keys(obj).length > 0 || obj instanceof Array ? obj : undefined;
  };

}
