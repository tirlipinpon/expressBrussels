import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Store, select} from "@ngrx/store";
import {
  RootStoreState,
  TranslatesStoreSelectors,
  TranslatesStoreActions,
  ClientsStoreActions,
  ClientsStoreSelectors
} from '../../root-store';
import {DataForm} from "../../../models/DataForm";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, FormArray, Validators} from "@angular/forms";
import {MatSelect} from "@angular/material";
import {OrderTranslate} from "../../../models/translate";

@Component({
  selector: 'app-translate-list',
  templateUrl: './translate-list.component.html',
  styleUrls: ['./translate-list.component.css']
})
export class TranslateListComponent implements OnInit {

  clientsItems$: Observable<DataForm[]>;
  clientsById$: Observable<DataForm>;
  translateItems$: Observable<OrderTranslate[]>;
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
    this.store$.dispatch(new TranslatesStoreActions.LoadRequestAction());
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
  update(order: OrderTranslate): void {
    this.store$.dispatch(new TranslatesStoreActions.UpdateRequestAction({id: order.id, changes: order}));
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
    this.translateItems$ = this.store$.pipe(
      select( TranslatesStoreSelectors.selectTranslatesItems )
    );
    this.error$ = this.store$.pipe(
      select( TranslatesStoreSelectors.selectTranslatesError )
    );
  }
  selectClientById(id: string) {
    this.selectedOption = '-1';
    if (id && id.length && id != '0') {
      this.translateItems$ = this.store$.pipe(
        select( TranslatesStoreSelectors.selectTranslatesItemsById(+id) )
      );
      this.setTranslateFormFromSelect(this.translateItems$);
    }
  }
  selectByMonth(month: number) {
    this.translateItems$ = this.store$.pipe(
      select( TranslatesStoreSelectors.selectTranslatesByMonth(+month) )
    );
    this.setTranslateFormFromSelect(this.translateItems$);
  }
  setTranslateFormFromSelect(translateItems$: Observable<OrderTranslate[]>) {
    translateItems$.subscribe(data => {
      let items = this.myForm.get('items') as FormArray;
      while (items.length !== 0) {
        items.removeAt(0)
      }
      data.forEach(item => this.addItem(items, item));
    });
  }
  addItem(items: FormArray, order: OrderTranslate): void {
    items.push(this.createItem(order));
  }
  createItem(order: OrderTranslate): FormGroup {
    let form = this.fb.group({
        id: [null],
        uuid: [null, Validators.required],
        created: [null],
        valid: [null],
        price: [null],
        fk_client_id: [null, Validators.required],
        country: [null, Validators.required],
        reference: [null, Validators.required],
        docName: [null, Validators.required],
        originalNbr: [null],
        translateNbr: [null],
        copyNbr: [null],
        originalCheck: [null],
        translateCheck: [null],
        copyCheck: [null],
        greffeInstanceCheck: [null],
        coursAppelCheck: [null],
        spfEtrangereCheck: [null],
        spfJusticeCheck: [null],
        communeCheck: [null],
        consulatCheck: [null],
        notaireCheck: [null],
        procedureType: [null, Validators.required], // normal/urgent
    });
    form.patchValue(order);
    return form;
  }
}
