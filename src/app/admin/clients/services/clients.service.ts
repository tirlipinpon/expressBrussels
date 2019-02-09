import { Injectable } from '@angular/core';
import {DataDataFormState, DataForm} from "../../../models/DataForm";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {catchError} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getItems(id: number): Observable<DataDataFormState> {
    // return of(DUMMY_CLIENTS);
    let url = this.apiUrl+'php//read_all_dataform.php';
    return  this.http.get<DataDataFormState>(url);
  }
  addItem(client: DataForm): Observable<DataForm> {
    // return of(DUMMY_CLIENTS);
    let url = this.apiUrl+'php//add_client.php';
    return this.http.post<DataForm>(url, client);
  }
  updateItem(client: DataForm): Observable<DataForm> {
    // return of(DUMMY_CLIENTS);
    let url = this.apiUrl+'php//update.php';
    return this.http.post<DataForm>(url, client);
  }
}
