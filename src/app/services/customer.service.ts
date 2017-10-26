import {Injectable} from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import {DataForm} from "../models/DataForm";
import {Observable} from "rxjs";


@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) {}

  getCustomer(data): Observable<DataForm> {
    // console.log('id from service: ', data.payload);
    let url = 'http://localhost/expressDB/php//read_one.php?id='+data.payload;
    return this.http.get(url)
      .catch(error => Observable.throw('error in service get customer with message from server -> '+ error));
    // res.subscribe(res => {
    //   console.log('in cutomer service get customer return this value customer = ',res);
    // });
    // return res;
  }

  setCustomer(data): Observable<any> {
    console.log('in customer service set new customer to db with this data-> ', data.payload);
    let url = 'http://localhost/expressDB/php//update.php';
    return this.http.post(url,data.payload);
  }


}
