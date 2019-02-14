
import {throwError as observableThrowError, Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';



import {PurchasseOrder} from '../models/PurchasseOrder';
import { environment } from '../../environments/environment';
import {catchError} from "rxjs/internal/operators";

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  saveOrder(data, id): Observable<any>{
    data.fk_customer_id = id;
    console.log('1) in order service save new order to db with this data-> ', data);
    let url = this.apiUrl+'php//addOrder.php';
    return this.http.post(url,data);
    //   .pipe(
    //   catchError(error => observableThrowError('error in service save order with message from server -> '+ error))
    // )
  }

  getOrders(data): Observable<PurchasseOrder[]> {
    // console.log('in order service get orders from db with this id_customer->', data.payload);
    let url = this.apiUrl+'php//read_all_orders_by_client_id.php?fk_customer_id='+data.payload;
    return this.http.get<PurchasseOrder[]>(url).pipe(
      catchError(error => observableThrowError('error in service get orders with message from server -> '+ error))
    )
  }

}
