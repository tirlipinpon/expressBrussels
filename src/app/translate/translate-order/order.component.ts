import {Component, OnInit, HostListener} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";
import {ComponentDeactivable} from "../../services/can-deactivate-form-guard.service";
import * as uuid from 'uuid';
import {Store} from "@ngrx/store";
import {
  RootStoreState
} from '../root-store';
@Component({
  selector: 'app-order',
  templateUrl: 'order.component.html',
  styleUrls: ['order.component.css']
})
export class OrderComponent implements OnInit, ComponentDeactivable {

  myOrderForm: FormGroup;
  isLinear = false;
  get arrayFormDataStep2() { return <FormArray>this.myOrderForm.get(['step2','destination']); }
  get arrayFormDataStep3() { return <FormArray>this.myOrderForm.get(['step3','destination']); }

  constructor(private fb: FormBuilder, private store$: Store<RootStoreState.RootState>) {
    this.createForm();
  }

  ngOnInit() {
    this.onChanges();
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
      id: [null],
      uuid: [uuid.v4(), Validators.required],
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
      }),
      created: [null],
      valid: [null],
      price: [null],
      typeProcedure: [null, Validators.required],
      fk_client_id: [null, Validators.required],
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
    // this.store$.dispatch(
    //   new OrderTranslateStoreActions.AddRequestAction()
    // );
  }
}
