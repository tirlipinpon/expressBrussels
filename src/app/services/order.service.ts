import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/first';

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

}
