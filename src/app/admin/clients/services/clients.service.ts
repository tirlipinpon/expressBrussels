import { Injectable } from '@angular/core';
import {DataDataFormState} from "../../../models/DataForm";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

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
}
