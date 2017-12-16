import {  Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import {PurchasseOrder} from "../models/PurchasseOrder";
import {Observable} from "rxjs";
import {AppState} from "../shared/appState";
import {Store} from "@ngrx/store";

import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import * as OrdersActions  from '../actions/orders.actions';
import * as RemovalActions  from '../actions/removal.actions';
import * as RecipientActions  from '../actions/recipient.actions';
import {DataForm} from "../models/DataForm";

import * as _ from "lodash";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrdersComponent implements OnInit, OnDestroy {

  orders$: Observable<PurchasseOrder[]>;
  removals$: Observable<DataForm[]>;
  recipients$: Observable<DataForm[]>;

  customerId = 1;
  datasOrders:  PurchasseOrder[] = [];
  datasRemovals:  DataForm[];
  datasRecipients:  DataForm[];

  displayedColumns = ['id', 'date', 'fk_removal_id', 'fk_recipient_id', 'options'];
  dataSource: MatTableDataSource<PurchasseOrder>;
  private filterValueEmpty = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private store: Store<AppState>) {
    this.storeSelect();
  }

  ngOnInit() {
    this.storeDispatch();
    this.getDatas();
  }

  getDatas() {
    this.removals$.subscribe(data => {
      if(data) {
        // console.log('data removals', data);
        this.datasRemovals = data;
        this.isDataLoaded();
      }
    });
    this.recipients$.subscribe(data => {
      if(data) {
        // console.log('data recipients', data);
        this.datasRecipients = data;
        this.isDataLoaded();
      }

    });
    this.orders$.subscribe( (data: any) =>  {
      if(data) {
        for(let i=0; i< Object.keys(data).length; i++) {
          // console.log('datasOrders:  ',data);
          this.datasOrders.push(data[i]);
        }
        // console.log('data Orders', data);
        this.isDataLoaded();
      }
    });
  }

  isDataLoaded() {

    if(this.datasRemovals && this.datasRecipients && this.datasOrders.length) {
      // console.log('eeeeeeeeeeeeee');

      for(let i=0; i< Object.keys(this.datasOrders).length; i++) {

        // console.log('datasRecipients: ', this.datasRecipients);

        const orderId = this.datasOrders[i].fk_removal_id;
        const removal = _.find(this.datasRemovals,['id', orderId]);

        const recipientId = this.datasOrders[i].fk_recipient_id;
        const recipient = _.find(this.datasRecipients,['id', recipientId]);
        // console.log('recipientId: ', recipientId, ' recipient: ', recipient);

         _.merge(this.datasOrders[i],
           {
             'order_address': removal.address,
             'order_cp': removal.cp,
             'order_name': removal.name,
             'order_number': removal.number,
             'order_phone': removal.phone,
             'order_state': removal.state,
             'order_info1': removal.infos.info1,
             'order_info2': removal.infos.info2,
           },
           {
             'recipient_address': removal.address,
             'recipient_cp': removal.cp,
             'recipient_name': removal.name,
             'recipient_number': removal.number,
             'recipient_phone': removal.phone,
             'recipient_state': removal.state,
             'recipient_info1': removal.infos.info1,
             'recipient_info2': removal.infos.info2,
           });
      }

      // console.log('this.datasOrders: ', this.datasOrders);

      this.dataSource = new MatTableDataSource(this.datasOrders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnDestroy(){
  }
  storeSelect() {
    this.orders$ = this.store.select('orders');
    this.removals$ = this.store.select('removals');
    this.recipients$ = this.store.select('recipients');
  }
  storeDispatch() {
    this.store.dispatch(new OrdersActions.GetOrders(this.customerId));
    this.store.dispatch(new RemovalActions.GetRemovals(this.customerId*10+1)); // (id + type)  eg: id = 69; type=1 fk_type=691
    this.store.dispatch(new RecipientActions.GetRecipients(this.customerId*10+2)); // (id + type)  eg: id = 69; type=2 fk_type=692
  }
  applyFilter(filterValue: string) {
    if(filterValue.length !== 0) {
      this.filterValueEmpty = false;
    }
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  canDeactivate(): boolean {
    console.log("canDeactivate orders:" );
    return  this.filterValueEmpty;
  }
  resetOrder() {
    this.filterValueEmpty = true;
  }


}
