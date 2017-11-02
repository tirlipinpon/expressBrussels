import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }

  saveOrder(data): Observable<any>{
    console.log('in order service save new order to db with this data-> ', data.payload);
    let url = 'http://localhost/expressDB/php//add_order.php';
    return this.http.post(url,data.payload);
  }

}
