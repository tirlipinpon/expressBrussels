import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ImportExport} from "../../models/import-export";
import {Store} from "@ngrx/store";
import {
  RootStoreState,
  ImportExportStoreActions,
  ImportExportStoreSelectors
} from '../root-store';

@Component({
  selector: 'app-i-e-order',
  templateUrl: './i-e-order.component.html',
  styleUrls: ['./i-e-order.component.css']
})
export class IEOrderComponent implements OnInit {

  importExportItems$: Observable<ImportExport[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  constructor(private store$: Store<RootStoreState.RootState>) { }

  ngOnInit() {
    this.store$.dispatch( new ImportExportStoreActions.AddRequestAction({item: null}) );
  }

}
