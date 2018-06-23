import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ContactState, Contact} from "../models/contact";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Action} from "@ngrx/store";

@Injectable()
export class ContactService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getContact(id_client: number): Observable<ContactState> {
    // console.log('in service get contact id_client: ', id_client);
    let url = this.apiUrl+'php//read_all_contact.php?fk_client_id='+id_client;
    return this.http.get(url)
      .catch(error => Observable.throw('error in service get contact with message from server -> ', error));
  }

  addContacts(contact: any): Observable<ContactState> {
    const resp0 = contact.payload[0];
    const resp1 = contact.payload[1];
    let url = this.apiUrl+'php//add_contact.php';

    return Observable.concat(
      this.http.post(url, resp0)
      .catch(error => Observable.throw('error in service add contact 1 with message from server -> ', error))
      ,
      this.http.post(url, resp1)
        .catch(error => Observable.throw('error in service add contact 2 with message from server -> ', error)))
  }

}
