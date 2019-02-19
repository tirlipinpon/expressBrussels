import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ImportExport} from "../../models/import-export";
import {Store} from "@ngrx/store";
import {
  RootStoreState,
  ImportExportStoreActions,
  ImportExportStoreSelectors
} from '../root-store';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
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

  constructor(private store$: Store<RootStoreState.RootState>, private fb: FormBuilder) {
   this.ieForm =  fb.group({
      id: [null],
      uuid: [uuid.v4(), Validators.required],
      country: [null, Validators.required],
      reference: [null, Validators.required],
      creation: [null],
      price: [null],
      valid: [null],
      fk_client_id: [null, Validators.required]
    });
  }

  ngOnInit() {
    // this.store$.dispatch( new ImportExportStoreActions.AddRequestAction({item: null}) );
  }

  send(): void{
    this.store$.dispatch( new ImportExportStoreActions.AddRequestAction({item: this.ieForm.value}) );
  }

}
