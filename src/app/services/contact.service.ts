import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ContactState, Contact} from "../models/contact";
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

  addContact(contact: Contact, id_client: number): Observable<ContactState> {
    const resp = {...contact, ...{fk_client_id: id_client }};
    console.log('in service add contact resp: ', resp);
    let url = this.apiUrl+'php//add_contact.php';
    return this.http.post(url, {...contact, resp})
      .catch(error => Observable.throw('error in service get contact with message from server -> ', error));
  }

}
