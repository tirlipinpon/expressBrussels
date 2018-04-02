import { Injectable } from '@angular/core';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { CustomerService } from '../../services/customer.service';
import { Observable } from 'rxjs/Observable';
import * as CustomerActions  from '../../actions/customer.actions';
import {NotificationService} from '../../services/notification.service';
import {AppState} from '../../shared/appState';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class CustomerEffectService {

  constructor(
    private store: Store<AppState>,
    private action$: Actions,
    private customerService: CustomerService,
    private notif: NotificationService) { }

  @Effect() getCustomer$: Observable<Action> = this.action$
    .ofType(CustomerActions.GET_CUSTOMER)
    .switchMap(action =>
      this.customerService.getCustomer(action)
        .map((payload) => {
          this.notif.notify('info', 'get customer', 'data ok');
          return new CustomerActions.GetCustomerSuccess(payload);
      })
        .catch(err => {
          this.notif.notify('error', 'Get customers', err);
          return Observable.of(new CustomerActions.GetCustomerFail(err))
        })
    );

  @Effect() saveCustomer$: Observable<Action> = this.action$
    .ofType(CustomerActions.SAVE_CUSTOMER)
    .withLatestFrom(  this.store.select('customer')  )
    .switchMap(action =>
      this.customerService.saveCustomer(action[1])
        .map((payload) => {
          // console.log('in effect SAVE Customer retrieved data from service =', payload);
          this.notif.notify('success', 'some alert', 'data custome saved');
          return new CustomerActions.SaveCustomerSuccess(payload);
        })
        .catch(err => {
          // console.log('error in effect EDIT customer with error -> ',err);
          this.notif.notify('error', 'some alert', err);
          return Observable.of(new CustomerActions.SaveCustomerFail(err))
        })
    );


}
