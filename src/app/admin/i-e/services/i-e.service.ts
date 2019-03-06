import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderTranslate} from "../../../models/translate";
import {HttpParams} from "@angular/common/http";
import {ImportExport, Administration} from "../../../models/import-export";

@Injectable({
  providedIn: 'root'
})
export class ImportExportService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getItems(): Observable<ImportExport[]> {
    // return of(DUMMY_CLIENTS);
    let url = this.apiUrl+'php//read_all_ie_orders.php';
    return  this.http.get<ImportExport[]>(url);
  }
  getItemsByClientId(fk_client_id: number): Observable<ImportExport[]> {
    // return of(DUMMY_CLIENTS);
    let url = this.apiUrl+'php//read_all_i_e_by_client_id.php';
    return  this.http.get<ImportExport[]>(url, { params:  new HttpParams().set('fk_client_id', ''+fk_client_id) });
  }
  updateItem(order: ImportExport): Observable<ImportExport> {
    // return of(DUMMY_CLIENTS);
    let url = this.apiUrl+'php//update_ie_order.php';
    return this.http.post<ImportExport>(url, order);
  }

  updateItemAdministration(items: Administration[]): Observable<Administration[]> {
    // return of(DUMMY_CLIENTS);
    let url = this.apiUrl+'php//update_ie_administration.php';
    return this.http.post<Administration[]>(url, items);
  }
}
