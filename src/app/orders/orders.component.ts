import {
  Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild, ViewChildren, QueryList, Attribute, AfterContentChecked
} from '@angular/core';
import {PurchasseOrder} from '../models/PurchasseOrder';
import {Observable} from 'rxjs';
import * as fromRoot from '../shared/appState';
import {Store, select} from '@ngrx/store';

import {MatPaginator, MatSort, MatTableDataSource, MatSortable} from '@angular/material';

import * as OrdersActions from '../actions/orders.actions';
import * as RemovalActions from '../actions/removal.actions';
import * as RecipientActions from '../actions/recipient.actions';
import {DataForm} from '../models/DataForm';

import * as _ from 'lodash';
import {CustomerService} from "../services/customer.service";

import * as jspdf from 'jspdf';
import * as html2canvas from "html2canvas"

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
  datasOrders:  PurchasseOrder[];
  datasRemovals:  DataForm[];
  datasRecipients:  DataForm[];
  displayedColumns = [
    'id',
    'created',
    'fk_removal_id',
    'fk_recipient_id',
    'options',
    'print'];
  dataSource: MatTableDataSource<PurchasseOrder>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChildren('mati') matInput: QueryList<any>;
  months: string[] = [];

  constructor(
    private store: Store<fromRoot.AppState>,
    @Attribute('type') type,
    private customerService: CustomerService) {
    this.customerService.currentCustomerId.subscribe(id => {
      if (id && +id !== 0) {
        this.customerId = id;
        this.storeDispatch();
      }
    });
  }

  ngOnInit() {
    this.storeSelect();
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
      if (data) {
        this.datasOrders = []; // TODO: why multiple record same value ?
        for(let i=0; i< Object.keys(data).length; i++) {
          this.datasOrders.push(data[i]);
        }
        this.isDataLoaded();
      }
    });
  }
  isExistReferenceClient(ref_removal?: string, ref_recipient?: string): boolean {
    if (ref_removal || ref_recipient) {
      return true;
    }
    return false;
  }
  isDataLoaded() {
    if (this.datasRemovals
      && this.datasRecipients
      && this.datasOrders
      && this.datasOrders.length) {

      for(let i=0; i< Object.keys(this.datasOrders).length; i++) {
        const removalId = this.datasOrders[i].fk_removal_id;
        const removal = _.find(this.datasRemovals,['id', removalId]);
        const recipientId = this.datasOrders[i].fk_recipient_id;
        const recipient = _.find(this.datasRecipients,['id', recipientId]);

        if (removal || recipient) {
          this.isReferenceClient =
            this.isExistReferenceClient(removal?removal.ref_client:null, recipient?recipient.ref_client:null);
          _.merge(this.datasOrders[i],
            {
              'removal_address': removal?removal.address:'',
              'removal_cp': removal?removal.cp:'',
              'removal_name': removal?removal.name:'',
              'removal_ref_client': removal?removal.ref_client:'',
              'removal_number': removal?removal.number:'',
              'removal_phone': removal?removal.phone:'',
              'removal_state': removal?removal.state:'',
              'removal_info1': removal?removal.infos.info1:'',
              'removal_info2': removal?removal.infos.info2:'',
            },
            {
              'recipient_address': recipient?recipient.address:'',
              'recipient_cp': recipient?recipient.cp:'',
              'recipient_name': recipient?recipient.name:'',
              'recipient_ref_client': recipient?recipient.ref_client:'',
              'recipient_number': recipient?recipient.number:'',
              'recipient_phone': recipient?recipient.phone:'',
              'recipient_state': recipient?recipient.state:'',
              'recipient_info1': recipient?recipient.infos.info1:'',
              'recipient_info2': recipient?recipient.infos.info2:'',
            });
        }
      }
      this.extractCurrentMonths(this.datasOrders);
      this.dataSource = new MatTableDataSource(this.datasOrders);
      this.dataSource.paginator = this.paginator;
      this.initialSort()
    }
  }
  extractCurrentMonths(orders: PurchasseOrder[]): void {
    orders.forEach(data => {
      const year = data.created.slice(0, 4);
      const current_year = (new Date()).getFullYear();
      if (current_year === +year) {
        this.months.push(data.created.slice(5, 7));
      }
    });
    this.months = _.uniq(this.months);
  }
  getCurrentDate(): Date {
    return new Date();
  }
  initialSort() {
    this.sort.sort(<MatSortable>({id: 'created', start: 'desc'}));
    this.dataSource.sort = this.sort;
  }
  storeSelect() {
    this.removals$ = this.store.pipe(select(fromRoot.selectors.getRemovalsData));
    this.recipients$ = this.store.pipe(select(fromRoot.selectors.getRecipientsData));
    this.orders$ = this.store.pipe(select(fromRoot.selectors.getOrders));
  }
  storeDispatch() {
    this.store.dispatch(new OrdersActions.GetOrders(this.customerId));
    this.store.dispatch(new RemovalActions.GetRemovals(this.customerId*10+1)); // (id + type)  eg: id = 69; type=1 fk_type=691
    this.store.dispatch(new RecipientActions.GetRecipients(this.customerId*10+2)); // (id + type)  eg: id = 69; type=2 fk_type=692
  }
  applyFilterName(filterValue: string, target: any): void {
    if (this.dataSource) {
      this.dataSource.filterPredicate = (data: any, filter: string) =>
      data.recipient_name.indexOf(filter) != -1 || data.removal_name.indexOf(filter) != -1;
      this.filterTable(filterValue, target);
    }

  }
  applyFilterDate(filterValue: string, target: any): void {
    if (this.dataSource) {
      this.dataSource.filterPredicate = (data: any, filter: string) => data.created.indexOf(filter) != -1;
      this.filterTable(filterValue, target);
    }
  }
  applyFilterRefClient(filterValue: string, target: any): void {
    if (this.dataSource) {
      this.dataSource.filterPredicate = (data: any, filter: string) =>
        data.recipient_ref_client ? data.recipient_ref_client.indexOf(filter) != -1 : false
          ||
          data.removal_ref_client ? data.removal_ref_client.indexOf(filter) != -1 : false;
      this.filterTable(filterValue, target);
    }
  }
  applyFilterMonth(filterValue: string, target: any): void {
    if (this.dataSource) {
      if (filterValue !== 'none') {
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const year = data.created.slice(0, 4);
          const current_year = (new Date()).getFullYear();
          if (current_year === +year) {
            return data.created.slice(5, 7).indexOf(filter) != -1
          }
        };
        this.filterTable(filterValue, target);
      } else {
        this.filterTable('', target);
      }
    }
  }
  applyFilterNumber(filterValue: string, target: any): void {
    if (this.dataSource) {
      this.dataSource.filterPredicate = (data: any, filter: string) => data.id.indexOf(filter) != -1;
      this.filterTable(filterValue, target);
    }
  }
  filterTable(filterValue: string, target: any) {
    this.resetNotCurrentFilter(target);
    if (this.dataSource) {
      this.resetFilter();
      if (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
      }
    }

  }
  resetFilter() {
    if (this.dataSource) {
      this.dataSource.filter = null;
    }
  }
  resetFilterButtonClick(): void {
    this.resetFilter();
    this.resetCriteriaInputFilter();
  }
  resetCriteriaInputFilter(): void {
    this.matInput.forEach(elem => {
      if (elem.nativeElement) {
        elem.nativeElement.value = '';
      }
      if (elem.controlType) { // select
        elem.value = '';
      }
    });
  }
  resetNotCurrentFilter(current: any): void {
    this.matInput.forEach(elem => {
        if (elem.nativeElement && elem.nativeElement.id !== current.id) {
          elem.nativeElement.value = '';
        }
        if (!current.source && elem.controlType) { // select
          elem.value = '';
        }
    });
  }
  captureScreen(elem: string) {
    let data = document.getElementById(elem);
    html2canvas(data).then(canvas => {
      let imgWidth = 210;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');

      let doc = new jspdf('p', 'mm');
      let position = 10;


      doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      };
      doc.save('expressBrussels.pdf');﻿

    });
  }
  getTotalCost(month?: number): number {
    if (this.dataSource && this.dataSource.data) {
      return this.dataSource.data.map(t => {
        if (+t.created.slice(0, 4) === +(new Date()).getFullYear()) {
          return +t.price
        }
        return 0;
      }).reduce((acc, value) => acc + value, 0);
    }
    return null;
  }
}
