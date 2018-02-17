import {Injectable} from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import {DataForm} from "../models/DataForm";
import {Observable} from "rxjs/Observable";
import { environment } from '../../environments/environment';

@Injectable()
export class CustomerService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCustomer(data): Observable<DataForm> {
    // console.log('id from service: ', data.payload);
    let url = this.apiUrl+'php//read_one.php?id='+data.payload;
    return this.http.get(url)
      .catch(error => Observable.throw('error in service get customer with message from server -> '+ error));
  }

  saveCustomer(data): Observable<any> {
    // console.log('in customer service set new customer to db with this data-> ', data);
    let url = this.apiUrl+'php//update.php';
    return this.http.post(url,data)
      .catch(error => Observable.throw('error in service save customer with message from server -> '+ error));
  }

  isLoggedIn(): boolean {
    return true;
  }


}
