import { Injectable } from '@angular/core';
import {DataDataFormState, DataForm} from "../../../models/DataForm";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {catchError, map} from "rxjs/internal/operators";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getItems(): Observable<DataDataFormState> {
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
  postFile(fileToUpload: File, fk_customer_id: number, kind: string ): Observable<boolean> {
    const endpoint = this.apiUrl+'php//upload_file.php';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData, {
      params:  new HttpParams().set('fk_customer_id', ''+fk_customer_id).set('kind', kind)
    }).pipe(
      map(() => { return true; }),
      catchError((e) =>  {
        console.log(e);
        return of(false);
      })
    );
  }
}
