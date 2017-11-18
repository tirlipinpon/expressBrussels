import { Injectable } from '@angular/core';
import { Action } from "@ngrx/store";
import { Actions, Effect } from "@ngrx/effects";
import { CustomerService } from "../../services/customer.service";
import { Observable } from "rxjs/Observable";
import * as CustomerActions  from '../../actions/customer.actions';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {NotificationService} from "../../services/notification.service";

@Injectable()
export class CustomerEffectService {

  constructor(
    private action$: Actions,
    private customerService: CustomerService,
    private notificationsService: NotificationService) { }

  @Effect() getCustomer$: Observable<Action> = this.action$
    .ofType(CustomerActions.GET_CUSTOMER)
    .switchMap(action =>
      this.customerService.getCustomer(action)
        .map((payload) => {
          this.notificationsService.notify('info', 'get customer', 'data ok');
          return new CustomerActions.GetCustomerSuccess(payload);
      })
        .catch(err => {
          this.notificationsService.notify('error', 'Get customers', err);
          return Observable.of(new CustomerActions.GetCustomerFail(err))
        })
    );

  @Effect() editCustomer$: Observable<Action> = this.action$
    .ofType(CustomerActions.EDIT_CUSTOMER)
    .switchMap(action =>
      this.customerService.setCustomer(action)
        .map((payload) => {
          // console.log('in effect EDIT Customer retrieved data from service =', payload);
          this.notificationsService.notify('success', 'some alert', 'data custome saved');
          return new CustomerActions.EditCustomerSuccess(payload);
        })
        .catch(err => {
          // console.log('error in effect EDIT customer with error -> ',err);
          this.notificationsService.notify('error', 'some alert', err);
          return Observable.of(new CustomerActions.GetCustomerFail(err))
        })
    );


}
