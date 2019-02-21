import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderTranslate} from "../../../models/translate";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TranslatesService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getItems(): Observable<OrderTranslate[]> {
    // return of(DUMMY_CLIENTS);
    let url = this.apiUrl+'php//read_all_translate.php';
    return  this.http.get<OrderTranslate[]>(url);
  }
  getItemsByClientId(fk_client_id: number): Observable<OrderTranslate[]> {
    // return of(DUMMY_CLIENTS);
    let url = this.apiUrl+'php//read_all_translate_by_client_id.php';
    return  this.http.get<OrderTranslate[]>(url, { params:  new HttpParams().set('fk_client_id', ''+fk_client_id) });
  }
  updateItem(order: OrderTranslate): Observable<OrderTranslate> {
    // return of(DUMMY_CLIENTS);
    let url = this.apiUrl+'php//update_translate.php';
    return this.http.post<OrderTranslate>(url, order);
  }
}
