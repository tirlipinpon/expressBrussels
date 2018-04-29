import {
  Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild, ViewChildren, QueryList, Attribute
} from '@angular/core';
import {PurchasseOrder} from '../models/PurchasseOrder';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../shared/appState';
import {Store} from '@ngrx/store';

import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import * as OrdersActions from '../actions/orders.actions';
import * as RemovalActions from '../actions/removal.actions';
import * as RecipientActions from '../actions/recipient.actions';
import {DataForm} from '../models/DataForm';

import * as _ from 'lodash';
import {CustomerService} from "../services/customer.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  orders$: Observable<PurchasseOrder[]>;
  removals$: Observable<DataForm[]>;
  recipients$: Observable<DataForm[]>;
  private customerId: number;
  isReferenceClient = false;
  datasOrders:  PurchasseOrder[] = [];
  datasRemovals:  DataForm[];
  datasRecipients:  DataForm[];
  displayedColumns = ['id', 'fk_removal_id', 'fk_recipient_id', 'options'];
  dataSource: MatTableDataSource<PurchasseOrder>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChildren('mati') matInput: QueryList<any>

  constructor(
    private store: Store<fromRoot.AppState>,
    @Attribute('type') type,
    private customerService: CustomerService) {
    this.customerService.currentCustomerId.subscribe(id => { this.customerId = id; });
    this.storeSelect();
  }

  ngOnInit() {
    this.storeDispatch();
    this.getDatas();
  }
  ngOnDestroy(){
  }

  getDatas() {
    this.removals$.subscribe(data => {
      // console.log('data removals: ', data);
      if (data.length) {
        this.datasRemovals = data;
        this.isDataLoaded();
      }
    });

    this.recipients$.subscribe(data => {
      // console.log('data recipients: ', data);
      if (data.length) {
        this.datasRecipients = data;
        this.isDataLoaded();
      }

    });
    this.orders$.subscribe( (data: any) =>  {
      // console.log('data orders: ', data);
      if (!!data) {
        for(let i=0; i< Object.keys(data).length; i++) {
          // console.log('datasOrders:  ',data);
          this.datasOrders.push(data[i]);
        }
        // console.log('data Orders', data);
        this.isDataLoaded();
      }
    });
  }
  isExistReferenceClient(ref_removal: string, ref_recipient: string): boolean {
    if (ref_removal || ref_recipient) {
      return true;
    }
    return false;
  }
  isDataLoaded() {

    if (this.datasRemovals
      && this.datasRecipients
      && this.datasOrders.length) {

      for(let i=0; i< Object.keys(this.datasOrders).length; i++) {
        // console.log('datasRecipients: ', this.datasRecipients);

        const removalId = this.datasOrders[i].fk_removal_id;
        const removal = _.find(this.datasRemovals,['id', removalId]);

        const recipientId = this.datasOrders[i].fk_recipient_id;
        const recipient = _.find(this.datasRecipients,['id', recipientId]);

        if (removal || recipient) {
          this.isReferenceClient = this.isExistReferenceClient(removal.ref_client, recipient.ref_client);
          _.merge(this.datasOrders[i],
            {
              'removal_address': removal.address,
              'removal_cp': removal.cp,
              'removal_name': removal.name,
              'removal_ref_client': removal.ref_client,
              'removal_number': removal.number,
              'removal_phone': removal.phone,
              'removal_state': removal.state,
              'removal_info1': removal.infos.info1,
              'removal_info2': removal.infos.info2,
            },
            {
              'recipient_address': recipient.address,
              'recipient_cp': recipient.cp,
              'recipient_name': recipient.name,
              'recipient_ref_client': recipient.ref_client,
              'recipient_number': recipient.number,
              'recipient_phone': recipient.phone,
              'recipient_state': recipient.state,
              'recipient_info1': recipient.infos.info1,
              'recipient_info2': recipient.infos.info2,
            });
        }


      }
      // console.log('this.datasOrders: ', this.datasOrders);
      this.dataSource = new MatTableDataSource(this.datasOrders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  storeSelect() {
    this.removals$ = this.store.select(fromRoot.selectors.getRemovalsData);
    this.recipients$ = this.store.select(fromRoot.selectors.getRecipientsData);
    this.orders$ = this.store.select(fromRoot.selectors.getOrders);

  }
  storeDispatch() {
    this.store.dispatch(new OrdersActions.GetOrders(this.customerId));
    this.store.dispatch(new RemovalActions.GetRemovals(this.customerId*10+1)); // (id + type)  eg: id = 69; type=1 fk_type=691
    this.store.dispatch(new RecipientActions.GetRecipients(this.customerId*10+2)); // (id + type)  eg: id = 69; type=2 fk_type=692
  }
  resetNotCurrentFilter(current: any): void {
    this.matInput.forEach(elem => {
      if (elem.nativeElement.id !== current.id) {
        elem.nativeElement.value = '';
      }
    });
  }
  applyFilter(filterValue: string, target: any): void {
    this.resetNotCurrentFilter(target);
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
