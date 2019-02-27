import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Store, select} from "@ngrx/store";
import {
  RootStoreState,
  ImportExportStoreSelectors,
  ImportExportStoreActions,
  ClientsStoreActions,
  ClientsStoreSelectors
} from '../../root-store';
import {DataForm} from "../../../models/DataForm";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, FormArray, Validators} from "@angular/forms";
import {MatSelect} from "@angular/material";
import {ImportExport} from "../../../models/import-export";

@Component({
  selector: 'app-i-e-list',
  templateUrl: './i-e-list.component.html',
  styleUrls: ['./i-e-list.component.css']
})
export class ImportExportListComponent implements OnInit {

  clientsItems$: Observable<DataForm[]>;
  clientsById$: Observable<DataForm>;
  ieItems$: Observable<ImportExport[]>;
  error$: Observable<string>;
  myForm: FormGroup;
  selectedOption: string;
  months: {id:number, name:string}[];

  @ViewChild('matSelect') matSelect: MatSelect;
  get formData() { return <FormArray>this.myForm.get('items'); }

  constructor(private store$: Store<RootStoreState.State>, private fb: FormBuilder) {
    this.dispatch();
    this.crateForm();
    this.createMonths();
  }
  dispatch(): void {
    this.store$.dispatch(new ImportExportStoreActions.LoadRequestAction());
    this.store$.dispatch(new ClientsStoreActions.LoadRequestAction());
  }
  createMonths() {
    let i = 0;
    this.months = [
      { id: i++, name: 'january' },
      { id: i++, name: 'february' },
      { id: i++, name: 'March' },
      { id: i++, name: 'April' },
      { id: i++, name: 'May' },
      { id: i++, name: 'June' },
      { id: i++, name: 'July' },
      { id: i++, name: 'August' },
      { id: i++, name: 'September' },
      { id: i++, name: 'October' },
      { id: i++, name: 'November' },
      { id: i++, name: 'December' }
      ]
  }
  ngOnInit() {
    this.select();
  }
  update(order: ImportExport): void {
    this.store$.dispatch(new ImportExportStoreActions.UpdateRequestAction({id: order.id, changes: order}));
  }
  crateForm() {
    this.myForm = this.fb.group({
      items: this.fb.array([ ])
    });
  }
  select(): void {
    this.clientsItems$ = this.store$.pipe(
      select(  ClientsStoreSelectors.selectClientsItems(0) )
    );
    this.ieItems$ = this.store$.pipe(
      select( ImportExportStoreSelectors.selectImportExportItems )
    );
    this.error$ = this.store$.pipe(
      select( ImportExportStoreSelectors.selectImportExportError )
    );
  }
  selectClientById(id: string) {
    this.selectedOption = '-1';
    if (id && id.length && id != '0') {
      this.ieItems$ = this.store$.pipe(
        select( ImportExportStoreSelectors.selectImportExportItemsById(+id) )
      );
      this.setImportExportFormFromSelect(this.ieItems$);
    }
  }
  selectByMonth(month: number) {
    this.ieItems$ = this.store$.pipe(
      select( ImportExportStoreSelectors.selectImportExportByMonth(+month) )
    );
    this.setImportExportFormFromSelect(this.ieItems$);
  }
  setImportExportFormFromSelect(ieItems$: Observable<ImportExport[]>) {
    ieItems$.subscribe(data => {
      let items = this.myForm.get('items') as FormArray;
      while (items.length !== 0) {
        items.removeAt(0)
      }
      data.forEach(item => this.addItem(items, item));
    });
  }
  addItem(items: FormArray, order: ImportExport): void {
    items.push(this.createItem(order));
  }
  createItem(order: ImportExport): FormGroup {
    let form = this.fb.group({
        id: [null],
        uuid: [null, Validators.required],
        created: [null],
        valid: [null],
        price: [null],
        fk_client_id: [null, Validators.required],
        country: [null, Validators.required],
        reference: [null, Validators.required],
        procedureType: [null, Validators.required] // normal/urgent
    });
    form.patchValue(order);
    return form;
  }
}
