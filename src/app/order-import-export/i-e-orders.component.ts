import {
  Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild, ViewChildren, QueryList, Attribute, AfterContentChecked
} from '@angular/core';

import {Observable, Subscription} from 'rxjs';
import * as fromRoot from '../shared/appState';
import {Store, select} from '@ngrx/store';

import {MatPaginator, MatSort, MatTableDataSource, MatSortable} from '@angular/material';

import * as OrdersIEActions from '../actions/orders-ie.actions';
import {DataForm} from '../models/DataForm';

import * as _ from 'lodash';
import {CustomerService} from "../services/customer.service";

import * as jspdf from 'jspdf';
import * as html2canvas from "html2canvas"
import {environment} from "../../environments/environment.prod";
import { ImportExport } from '../models/import-export';

@Component({
  selector: 'app-import-export-orders',
  templateUrl: './i-e-orders.component.html',
  styleUrls: ['./i-e-orders.component.css']
})
export class ImportExportOrdersComponent implements OnInit, OnDestroy {

  orders$: Observable<ImportExport[]>;

  private customerId: number;

  datasOrders:  ImportExport[];
  displayedColumns = [
    'id',
    'reference',
    'created',
    'fk_removal_id',
    'fk_recipient_id',
    'price',
    'procedureType',
    'print'];
  dataSource: MatTableDataSource<ImportExport>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChildren('mati') matInput: QueryList<any>;
  months: string[] = [];
  apiUrl = environment.apiUrl;
  isAllMonthOrdersValide: boolean;
  private sub$: Subscription;
  private subscriptions = [];

  constructor(
    private store: Store<fromRoot.AppState>,
    @Attribute('type') type,
    private customerService: CustomerService) {
    this.sub$ = this.customerService.currentCustomerId.subscribe(id => {
      if (+id && +id !== 0) {
        this.customerId = id;
        this.storeDispatch();
      }
    });
    this.subscriptions.push(this.sub$);
    this.isAllMonthOrdersValide = false;
  }

  ngOnInit() {
    this.storeSelect();
    this.getDatas();
  }
  ngOnDestroy(){
  }
  getDatas() {
    this.sub$ = this.orders$.subscribe( (data: any) =>  {
      if (data) {
        this.datasOrders = []; // TODO: why multiple record same value ?
        for(let i=0; i< Object.keys(data).length; i++) {
          this.datasOrders.push(data[i]);
        }
        this.isDataLoaded();
      }
    });
    this.subscriptions.push(this.sub$);
  }
  isExistReferenceClient(ref_removal?: string, ref_recipient?: string): boolean {
    if (ref_removal || ref_recipient) {
      return true;
    }
    return false;
  }
  isDataLoaded() {
    if (this.datasOrders && this.datasOrders.length) {
      this.extractCurrentMonths(this.datasOrders);
      this.dataSource = new MatTableDataSource(this.datasOrders);
      this.dataSource.paginator = this.paginator;
      this.initialSort()
    }
  }
  extractCurrentMonths(orders: ImportExport[]): void {
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
    this.orders$ = this.store.pipe(select(fromRoot.selectors.getIeOrders));
  }
  storeDispatch() {
    this.store.dispatch(new OrdersIEActions.GetRequestAction(this.customerId));
  }
  applyFilterReference(filterValue: string, target: any): void {
    if (this.dataSource) {
      this.isAllMonthOrdersValide = false;
      this.dataSource.filterPredicate = (data: any, filter: string) => data.reference.indexOf(filter) != -1;
      this.filterTable(filterValue, target);
    }
  }
  applyFilterDate(filterValue: string, target: any): void {
    if (this.dataSource) {
      this.isAllMonthOrdersValide = false;
      this.dataSource.filterPredicate = (data: any, filter: string) => data.created.indexOf(filter) != -1;
      this.filterTable(filterValue, target);
    }
  }
  applyFilterProcedureType(filterValue: string, target: any): void {
    if (this.dataSource) {
      this.isAllMonthOrdersValide = false;
      this.dataSource.filterPredicate = (data: any, filter: string) => data.procedureType.indexOf(filter) != -1;
      this.filterTable(filterValue, target);
    }
  }
  applyFilterMonth(filterValue: string, target: any): void {
    if (this.dataSource) {
      this.isAllMonthOrdersValide = false;
      if (filterValue !== 'none') {
        this.isAllMonthOrdersValide = true;
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const year = data.created.slice(0, 4);
          const current_year = (new Date()).getFullYear();
          if (current_year === +year) {
            let resp = data.created.slice(5, 7).indexOf(filter) != -1;
            if (resp) {
              if (+data.valide === 0) {
                this.isAllMonthOrdersValide = false;
              }
            }
            return resp;
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
      this.isAllMonthOrdersValide = false;
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        let data_id = ''+data.id;
       let resp = data_id.indexOf(filter) != -1;
       return resp;
      };
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
    this.isAllMonthOrdersValide = false;
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
      let pageHeight = 280;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');

      let doc = new jspdf('p', 'mm');
      let position = 10;

      doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      doc.text('Hello world!', 30, 30);
      doc.addPage();

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
  downloadPdf(url: string): void {
    console.log(url);
  }
}
