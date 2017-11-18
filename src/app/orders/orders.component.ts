import {Component, OnInit, ViewEncapsulation, OnDestroy} from '@angular/core';
import {PurchasseOrder} from "../models/PurchasseOrder";
import {Observable} from "rxjs";
import {AppState} from "../shared/appState";
import {Store} from "@ngrx/store";

import * as OrdersActions  from '../actions/orders.actions';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrdersComponent implements OnInit, OnDestroy {

  orders$: Observable<PurchasseOrder[]>;
  customerId = 1;
  datas:  PurchasseOrder[];

  constructor(private store: Store<AppState>) {
    this.orders$ = this.store.select('orders');
    this.orders$.subscribe( (data: any) =>  {
      console.log("data from stro select subscribe: ", data)
      this.datas = data;
    });
  }

  ngOnInit() {
    this.store.dispatch(new OrdersActions.GetOrders(this.customerId))
  }
  ngOnDestroy(){

  }


}
