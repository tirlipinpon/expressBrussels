import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";

@Component({
  selector: 'app-order',
  templateUrl: 'order.component.html',
  styleUrls: ['order.component.css']
})
export class OrderComponent implements OnInit {

  myOrderForm: FormGroup;
  isLinear = false;
  get arrayFormDataStep2() { return <FormArray>this.myOrderForm.get(['step2','destination']); }
  get arrayFormDataStep3() { return <FormArray>this.myOrderForm.get(['step3','destination']); }

  constructor(private fb: FormBuilder) {
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
  }

  createForm(): void {
    this.myOrderForm = this.fb.group({
      id: [null],
      uuid: [null, Validators.required],
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
        notaireCheck: [null],
        destination: this.fb.array([ ])
      }),
      step3: this.fb.group({
        procedureCheck: [null, Validators.required],
        destination: this.fb.array([
          this.createItem('removal'),
          this.createItem('recipient')
        ])
      }),
      creation: [null],
      valid: [null],
      price: [null],
      type: [null, Validators.required],
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
      type: ['translate', Validators.required], // translate/import-export
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

}
