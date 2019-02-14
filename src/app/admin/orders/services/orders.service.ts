import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PurchasseOrder, DataPurchasseOrderState} from "../../../models/PurchasseOrder";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getItems(fk_customer_id: number): Observable<PurchasseOrder[]> {
    // return of(DUMMY_CLIENTS);
    let url = this.apiUrl+'php//read_all_orders_by_client_id.php';
    return  this.http.get<PurchasseOrder[]>(url, { params:  new HttpParams().set('fk_customer_id', ''+fk_customer_id) });
  }
  updateItem(order: PurchasseOrder): Observable<PurchasseOrder> {
    // return of(DUMMY_CLIENTS);
    let url = this.apiUrl+'php//update_order.php';
    return this.http.post<PurchasseOrder>(url, order);
  }
}
