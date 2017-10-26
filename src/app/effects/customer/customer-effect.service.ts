import { Injectable } from '@angular/core';
import {Store, Action} from "@ngrx/store";
import {Actions, Effect} from "@ngrx/effects";
import {CustomerService} from "../../services/customer.service";
import {Observable} from "rxjs";
import * as CustomerActions  from '../../actions/customer.actions';

@Injectable()
export class CustomerEffectService {

  constructor(
    private action$: Actions,
    private customerService: CustomerService) { }

  @Effect()
  getCustomer: Observable<Action> = this.action$
    .ofType(CustomerActions.GET_CUSTOMER)
    .switchMap(action =>
      this.customerService.getCustomer(action)
        .map((payload) => {
        let customerData = payload;
        // console.log('in effect getCustomer retrieve data from service =', customerData);
        return new CustomerActions.GetCustomerSuccess(customerData);
      })
        .catch(err => {
          console.log('error in effect get customer');
          return Observable.of(new CustomerActions.GetCustomerFail(err))
        })
    );

  @Effect()
  editCustomer: Observable<Action> = this.action$
    .ofType(CustomerActions.EDIT_CUSTOMER)
    .switchMap(action =>
      this.customerService.setCustomer(action)
        .map((payload) => {
          console.log('in effect EDIT Customer retrieved data from service =', payload);
          return new CustomerActions.EditCustomerSuccess(payload);
        })
        .catch(err => {
          console.log('error in effect EDIT customer with error -> ',err);
          return Observable.of(new CustomerActions.GetCustomerFail(err))
        })
    );


}
