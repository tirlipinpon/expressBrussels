import {Component, OnInit, ElementRef, ViewChild, OnDestroy} from '@angular/core';
import {Store, select} from "@ngrx/store";
import {
  RootStoreState,
  ImportExportStoreSelectors,
  ImportExportStoreActions,
  ClientsStoreActions,
  ClientsStoreSelectors
} from '../../root-store';
import {DataForm} from "../../../models/DataForm";
import {Observable, Subscription} from "rxjs";
import {FormBuilder, FormGroup, FormArray, Validators} from "@angular/forms";
import {MatSelect} from "@angular/material";
import {ImportExport, Administration} from "../../../models/import-export";

@Component({
  selector: 'app-i-e-list',
  templateUrl: './i-e-list.component.html',
  styleUrls: ['./i-e-list.component.css']
})
export class ImportExportListComponent implements OnInit, OnDestroy {

  clientsItems$: Observable<DataForm[]>;
  clientsById$: Observable<DataForm>;
  ieItems$: Observable<ImportExport[]>;
  error$: Observable<string>;
  myForm: FormGroup;
  selectedOption: string;
  months: {id:number, name:string}[];
  client_id: number;
  private sub$: Subscription;
  private subscriptions = [];

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
  ngOnDestroy(): void {
    if (this.subscriptions.length) {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
  }
  update(order: ImportExport): void {
    this.store$.dispatch(new ImportExportStoreActions.UpdateRequestAction({id: order.id, changes: order}));
    this.store$.dispatch( new ImportExportStoreActions.UpdateAdminRequestAction({ items: order.administrations, id: order.id }) );
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
    this.client_id = +id;
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
    this.sub$ = ieItems$.subscribe(data => {
      let items = this.myForm.get('items') as FormArray;
      while (items.length !== 0) {
        items.removeAt(0)
      }
      data.forEach(item => this.addItem(items, item));

    });
    this.subscriptions.push(this.sub$);
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
        procedureType: [null, Validators.required], // normal/urgent
        administrations: this.fb.array([])
    });
    form.patchValue(order);

    let itemsAdmin = form.get('administrations') as FormArray;
    order['administrations'].forEach(item => this.addItemAdministration(itemsAdmin, item));
    return form;
  }
  addItemAdministration(items: FormArray, admin: Administration): void {
    items.push(this.createItemAdmin(admin));
  }
  createItemAdmin(admin: Administration): FormGroup {
    let form = this.fb.group({
      id: [null, Validators.required],
      kind: [null, Validators.required],
      certifCheck: [null, Validators.required],
      annexeCheck: [null, Validators.required],
      copyCheck: [null, Validators.required],
      invoicesCheck: [null, Validators.required],
      copyInvoicesCheck: [null, Validators.required],
      fk_uuid_ie: [null, Validators.required],
    });
    form.patchValue(admin);
    return form;
  }
}
