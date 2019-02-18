import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {ImportExport} from "../../models/import-export";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderIEService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getItems(): Observable<ImportExport> {
    // return of(DUMMY_CLIENTS);
    let url = this.apiUrl+'php//read_all_dataform.php';
    return  this.http.get<ImportExport>(url);
  }
  addItem(order: ImportExport): Observable<ImportExport> {
    // return of(DUMMY_CLIENTS);
    let url = this.apiUrl+'php//add_translate_order.php';
    return this.http.post<ImportExport>(url, order);
  }
  updateItem(client: ImportExport): Observable<ImportExport> {
    // return of(DUMMY_CLIENTS);
    let url = this.apiUrl+'php//update.php';
    return this.http.post<ImportExport>(url, client);
  }
}
