import {throwError as observableThrowError, Observable, concat, of} from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ContactState} from "../models/contact";
import {environment} from "../../environments/environment";
import {catchError, mergeMap} from "rxjs/internal/operators";

@Injectable()
export class ContactService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getContact(id_client: number): Observable<ContactState> {
    // console.log('in service get contact id_client: ', id_client);
    let url = this.apiUrl+'php//read_all_contact.php?fk_client_id='+id_client;
    return this.http.get<ContactState>(url).pipe(
      catchError(error => observableThrowError('error in service get contact with message from server -> ', error))
    )
  }

  addContacts(order: any): Observable<any> {
    let url = this.apiUrl+'php//add_contact.php';
    const data = order.payload;
    return  this.http.post(url,data);
  }

}
