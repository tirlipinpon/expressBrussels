import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/first';
import {PurchasseOrder} from "../models/PurchasseOrder";

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }

  saveOrder(data): Observable<any>{
    console.log('in order service save new order to db with this data-> ', data);
    let url = 'http://localhost/expressDB/php//addOrder.php';
    // let resp$ =  this.http.post(url,data.payload);
    // resp$.subscribe(data => console.log("order service save order responce: ",data));
    // return resp$;
    return this.http.post(url,data)
      .catch(error => Observable.throw('error in service save order with message from server -> '+ error));
  }

  getOrders(data): Observable<PurchasseOrder[]> {
    console.log('in order service get orders from db with this id_customer->', data.payload);
    let url = 'http://localhost/expressDB/php//read_all_orders.php?fk_customer_id='+data.payload;
    return this.http.get<PurchasseOrder[]>(url)
      .catch(error => Observable.throw('error in service get orders with message from server -> '+ error));

    // response$.subscribe(res => {
    //   console.log('in orders service get Orders by fk_customer_id return this values = ',res);
    // });
    //
    // return response$;
    // return Observable.of(res[Object.keys(res)[0]]);
  }

}
