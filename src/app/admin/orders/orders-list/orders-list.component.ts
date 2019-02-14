import {Component, OnInit} from '@angular/core';
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
import {FormBuilder, FormGroup, FormArray } from "@angular/forms";

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  clientsItems$: Observable<DataForm[]>;
  clientsById$: Observable<DataForm>;
  ordersItems$: Observable<PurchasseOrder[]>;
  error$: Observable<string>;
  myOrderForm: FormGroup;

  constructor(private store$: Store<RootStoreState.State>, private fb: FormBuilder) {
    this.store$.dispatch(new ClientsStoreActions.LoadRequestAction());
    this.crateFormOrder();
  }
  ngOnInit() {
    this.select();
    this.ordersItems$.subscribe(data => {
      let items = this.myOrderForm.get('items') as FormArray;
      while (items.length !== 0) {
        items.removeAt(0)
      }
      data.forEach(item => this.addItem(items, item));
    });
  }
  crateFormOrder() {
    this.myOrderForm = this.fb.group({
      items: this.fb.array([ ])
    });
  }
  createItem(order: PurchasseOrder): FormGroup {
     let form = this.fb.group({
      id: [null],
      fk_customer_id: [null],
      fk_removal_id: [null],
      fk_recipient_id: [null],
      contact_removal: [null],
      message_removal: [null],
      contact_recipient: [null],
      message_recipient: [null],
      created: [null],
      price: [null],
      distance: [null],
      elapse_time: [null],
      status: [null],
      options: [null],
      tomorrow: [null],
      transport: [null],
      cascades: [null],
      valide: [null]
    });
    form.patchValue(order);
    return form;
  }
  select() {
    this.clientsItems$ = this.store$.pipe(
      select(  ClientsStoreSelectors.selectClientsItems )
    );
    this.ordersItems$ = this.store$.pipe(
      select( OrdersStoreSelectors.selectOrdersItems )
    );
    this.error$ = this.store$.pipe(
      select( OrdersStoreSelectors.selectOrdersError )
    );
  }
  addItem(items: FormArray, order: PurchasseOrder): void {
    items.push(this.createItem(order));
  }
  selectClientById(id: string) {
    if (id && id.length && id != '0') {
      this.store$.dispatch(new OrdersStoreActions.LoadRequestAction(+id));
    }
  }
  updateOrder(order: PurchasseOrder): void {
    console.log(order);
    this.store$.dispatch(new OrdersStoreActions.UpdateRequestAction({id: order.id, changes: order}));
  }
}
