import {throwError as observableThrowError, Observable, BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataForm} from '../models/DataForm';
import {environment} from '../../environments/environment';
import * as fromRoot from '../shared/appState';
import {Store} from "@ngrx/store";
import {catchError} from "rxjs/internal/operators";

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

  sendEmail(data): Observable<any> {
    // console.log('in customer service set new customer to db with this data-> ', data);
    let url = this.apiUrl + 'php//read_one_by_email.php';
    return this.http.post(url, {email: data.payload});
  }

  getCustomer(data: any): Observable<DataForm> {
    // console.log('id from service: ', data.payload);
    let url = this.apiUrl + 'php//read_one.php?id=' + data.payload;
    return this.http.get<DataForm>(url).pipe(
      catchError(error => observableThrowError('error in service get customer with message from server -> ', error))
    )
  }

  saveCustomer(data): Observable<any> {
    // console.log('in customer service set new customer to db with this data-> ', data);
    let url = this.apiUrl + 'php//update.php';
    return this.http.post(url, data).pipe(
      catchError(error => observableThrowError('error in service save customer with message from server -> ', error))
    )
  }

  isLoggedIn(): boolean {
    return true;
  }
}
