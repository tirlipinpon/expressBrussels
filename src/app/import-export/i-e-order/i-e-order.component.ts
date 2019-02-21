import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-i-e-order',
  templateUrl: './i-e-order.component.html',
  styleUrls: ['./i-e-order.component.css']
})
export class IEOrderComponent implements OnInit {

  importExportItems$: Observable<ImportExport[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  ieForm: FormGroup;
  get arrayFormDataStep() { return <FormArray>this.ieForm.get(['destination']); }

  constructor(private store$: Store<RootStoreState.RootState>, private fb: FormBuilder) {
   this.ieForm =  fb.group({
      id: [null],
      uuid: [uuid.v4(), Validators.required],
      country: [null, Validators.required],
      reference: [null, Validators.required],
      creation: [null],
      price: [null],
      valid: [null],
      fk_client_id: [null, Validators.required],
      destination: fb.array([
        this.createItem('removal'),
        this.createItem('recipient')])
    });
  }

  ngOnInit() {
    // this.store$.dispatch( new ImportExportStoreActions.AddRequestAction({item: null}) );
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
  send(): void{
    this.store$.dispatch( new ImportExportStoreActions.AddRequestAction({item: this.ieForm.value}) );
  }

}
