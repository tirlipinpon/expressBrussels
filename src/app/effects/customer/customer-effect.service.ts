import { Injectable } from '@angular/core';
import { Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { CustomerService } from '../../services/customer.service';
import {Observable, of} from 'rxjs';
import * as CustomerActions  from '../../actions/customer.actions';
import {NotificationService} from '../../services/notification.service';
import {AppState} from '../../shared/appState';
import {switchMap, catchError, map, withLatestFrom} from "rxjs/internal/operators";




@Injectable()
export class CustomerEffectService {

  constructor(
    private store: Store<AppState>,
    private action$: Actions,
    private customerService: CustomerService,
    private notif: NotificationService) { }

  @Effect() getCustomer$ = this.action$.pipe(
    ofType(CustomerActions.GET_CUSTOMER),
    switchMap(action =>
      this.customerService.getCustomer(action).pipe(
        map((payload) => {
          this.notif.notify('info', 'get customer', 'data ok');
          return new CustomerActions.GetCustomerSuccess(payload);
        }),
        catchError(err => {
          this.notif.notify('error', 'Get customers', err);
          return of(new CustomerActions.GetCustomerFail(err))
        })
      )
  )
    );

  @Effect() saveCustomer$  = this.action$.pipe(
    ofType(CustomerActions.SAVE_CUSTOMER),
    withLatestFrom(  this.store.select('customer')  ),
    switchMap(action =>
      this.customerService.saveCustomer(action[1]).pipe(
        map((payload) => {
          this.notif.notify('success', 'some alert', 'data custome saved');
          return new CustomerActions.SaveCustomerSuccess(payload);
        }),
        catchError(err => {
          this.notif.notify('error', 'some alert', err);
          return of(new CustomerActions.SaveCustomerFail(err))
        })
      )
    )
  )



}
