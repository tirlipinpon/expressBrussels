import {Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {Store, select} from "@ngrx/store";
import {
  RootStoreState,
  OrdersStoreSelectors,
  OrdersStoreActions,
  ClientsStoreActions,
  ClientsStoreSelectors
} from '../../root-store';
import {DataForm} from "../../../models/DataForm";
import {Observable} from "rxjs";
import {PurchasseOrder} from "../../../models/PurchasseOrder";
import {FormBuilder, FormGroup, FormArray, Validators} from "@angular/forms";
import {MatSelect} from "@angular/material";

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListComponent implements OnInit {

  clientsItems$: Observable<DataForm[]>;
  removalsItems$: Observable<DataForm[]>;
  recipientsItems$: Observable<DataForm[]>;
  clientsById$: Observable<DataForm>;
  ordersItems$: Observable<PurchasseOrder[]>;
  error$: Observable<string>;
  myOrderForm: FormGroup;
  selectedOption: number;
  months: {id:number, name:string}[];

  @ViewChild('matSelect') matSelect: MatSelect;
  get formData() { return <FormArray>this.myOrderForm.get('items'); }

  constructor(private store$: Store<RootStoreState.State>, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.store$.dispatch(new ClientsStoreActions.LoadRequestAction());
    this.crateFormOrder();
    this.createMonths();
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
  crateFormOrder() {
    this.myOrderForm = this.fb.group({
      items: this.fb.array([ ])
    });
  }
  select() {
    this.removalsItems$ = this.store$.pipe(
      select(  ClientsStoreSelectors.selectClientsItems(1) )
    );
    this.recipientsItems$ = this.store$.pipe(
      select(  ClientsStoreSelectors.selectClientsItems(2) )
    );
    this.clientsItems$ = this.store$.pipe(
      select(  ClientsStoreSelectors.selectClientsItems(0) )
    );
    this.ordersItems$ = this.store$.pipe(
      select( OrdersStoreSelectors.selectOrdersItems )
    );
    this.error$ = this.store$.pipe(
      select( OrdersStoreSelectors.selectOrdersError )
    );
  }
  selectClientById(id: string) {
    this.selectedOption = -1;
    if (id && id.length && id != '0') {
      this.store$.dispatch(new OrdersStoreActions.LoadRequestAction(+id));
      this.ordersItems$ = this.store$.pipe( select( OrdersStoreSelectors.selectOrdersItems ) );
      this.setOrderFormFromSelect(this.ordersItems$);
    }
  }
  updateOrder(order: PurchasseOrder): void {
    this.store$.dispatch(new OrdersStoreActions.UpdateRequestAction({id: order.id, changes: order}));
  }
  selectOrdersByMonth(month: number) {
    this.selectedOption = month;
    this.ordersItems$ = this.store$.pipe(
      select( OrdersStoreSelectors.selectOrdersByMonth(+month) )
    );
    this.setOrderFormFromSelect(this.ordersItems$);
  }
  setOrderFormFromSelect(ordersItems$: Observable<PurchasseOrder[]>) {
    ordersItems$.subscribe(data => {
      let items = this.myOrderForm.get('items') as FormArray;
      while (items.length !== 0) {
        items.removeAt(0)
      }
      data.forEach(item => this.addItem(items, item));
    });
  }
  addItem(items: FormArray, order: PurchasseOrder): void {
    items.push(this.createItem(order));
  }
  createItem(order: PurchasseOrder): FormGroup {
    let form = this.fb.group({
      id: [null, Validators.required],
      fk_customer_id: [null, Validators.required],
      fk_removal_id: [null, Validators.required],
      fk_recipient_id: [null, Validators.required],
      contact_removal: [null],
      message_removal: [null],
      contact_recipient: [null],
      message_recipient: [null],
      created: [null],
      price: [null, Validators.required],
      distance: [null],
      elapse_time: [null],
      status: [null],
      options: [null, Validators.required],
      tomorrow: [null, Validators.required],
      transport: [null, Validators.required],
      cascades: [null],
      valide: [null, Validators.required]
    });
    form.patchValue(order);
    return form;
  }
}
