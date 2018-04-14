import {Injectable} from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import {DataForm} from '../models/DataForm';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import {BehaviorSubject} from "rxjs";
import * as fromRoot from '../shared/appState';
import {Store} from "@ngrx/store";

@Injectable()
export class CustomerService {

  private apiUrl = environment.apiUrl;
  private messageSource = new BehaviorSubject<number>(0);
  private customerId$: Observable<number>;
  currentCustomerId = this.messageSource.asObservable();

  constructor(private http: HttpClient,
              private store: Store<fromRoot.AppState>) {
    this.customerId$ = this.store.select(fromRoot.selectors.getCustomerId);
    this.customerId$.subscribe(data => {
      if (data !== 0) {
        this.setCustomerId(data)
      }
    });
  }

  setCustomerId(message: number) {
    this.messageSource.next(message);
  }

  getCustomer(data: any): Observable<DataForm> {
     // console.log('id from service: ', data.payload);
    let url = this.apiUrl+'php//read_one.php?id='+data.payload;
    return this.http.get(url)
      .catch(error => Observable.throw('error in service get customer with message from server -> ', error));
  }

  saveCustomer(data): Observable<any> {
    // console.log('in customer service set new customer to db with this data-> ', data);
    let url = this.apiUrl+'php//update.php';
    return this.http.post(url,data)
      .catch(error => Observable.throw('error in service save customer with message from server -> ', error));
  }

  isLoggedIn(): boolean {
    return true;
  }


}
