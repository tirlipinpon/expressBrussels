import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import {Store, select} from "@ngrx/store";
import {
  RootStoreState,
  OrdersStoreSelectors,
  OrdersStoreActions,
  ClientsStoreActions,
  ClientsStoreSelectors
} from '../../root-store';
import {DataForm} from "../../../models/DataForm";
import {Observable, Subscription} from "rxjs";
import {PurchasseOrder} from "../../../models/PurchasseOrder";
import {FormBuilder, FormGroup, FormArray, Validators} from "@angular/forms";
import {MatSelect} from "@angular/material";

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListComponent implements OnInit, OnDestroy {

  clientsItems$: Observable<DataForm[]>;
  removalsItems$: Observable<DataForm[]>;
  recipientsItems$: Observable<DataForm[]>;
  clientsById$: Observable<DataForm>;
  ordersItems$: Observable<PurchasseOrder[]>;
  error$: Observable<string>;
  myOrderForm: FormGroup;
  selectedOption: number;
  months: {id:number, name:string}[];
  client_id: number;
  private sub$: Subscription;
  private subscriptions = [];

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
    this.store$.dispatch(new OrdersStoreActions.ResetRequestAction());
    this.select();
    this.setOrderFormFromSelect();
  }
  ngOnDestroy(): void {
    if (this.subscriptions.length) {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
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
    let currentDate = new Date();
    let monthNumber = currentDate.getMonth();
    this.selectedOption = monthNumber;
    this.ordersItems$ = this.store$.pipe(
      select( OrdersStoreSelectors.selectOrdersByMonth(monthNumber) )
    );
    this.error$ = this.store$.pipe(
      select( OrdersStoreSelectors.selectOrdersError )
    );
  }
  selectClientById(id: string) {
    this.client_id = +id;
    if (id && id.length && id != '0') {
      this.store$.dispatch(new OrdersStoreActions.ResetRequestAction());
      this.store$.dispatch(new OrdersStoreActions.LoadRequestAction(+id));
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
    this.setOrderFormFromSelect();
  }
  setOrderFormFromSelect() {
    this.sub$ = this.ordersItems$.subscribe(data => {
      this.crateFormOrder();
      if (data.length) {
        let items = this.myOrderForm.get('items') as FormArray;
        data.forEach(item => this.addItem(items, item));
      }
    });
    this.subscriptions.push(this.sub$);
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
