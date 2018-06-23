import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ContactState} from "../models/contact";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

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
    const data = contact.payload.payload[1];
    let url = this.apiUrl + 'php//add_contact.php';
    const resp0 = {
      name: data.contact_removal,
      fk_client_id: data.fk_customer_id,
      fk_resp_dest_id: data.fk_removal_id
    }
    const resp1 = {
      name: data.contact_recipient,
      fk_client_id: data.fk_customer_id,
      fk_resp_dest_id: data.fk_recipient_id
    }

    return Observable.concat(
      this.http.post(url, resp0)
      .catch(error => Observable.throw('error in service add contact 1 with message from server -> ', error))
      ,
      this.http.post(url, resp1)
        .catch(error => Observable.throw('error in service add contact 2 with message from server -> ', error))
    )
  }

}
