import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderTranslate} from "../../models/translate";

@Injectable({
  providedIn: 'root'
})
export class OrderTranslateService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getItems(): Observable<OrderTranslate> {
    // return of(DUMMY_CLIENTS);
    let url = this.apiUrl+'php//read_all_dataform.php';
    return  this.http.get<OrderTranslate>(url);
  }
  addItem(order: OrderTranslate): Observable<OrderTranslate> {
    // return of(DUMMY_CLIENTS);
    let url = this.apiUrl+'php//add_translate_order.php';
    return this.http.post<OrderTranslate>(url, order);
  }
  updateItem(client: OrderTranslate): Observable<OrderTranslate> {
    // return of(DUMMY_CLIENTS);
    let url = this.apiUrl+'php//update.php';
    return this.http.post<OrderTranslate>(url, client);
  }
}
