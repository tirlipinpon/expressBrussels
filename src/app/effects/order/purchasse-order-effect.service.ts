import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import {AppState} from '../../shared/appState';
import {OrderService} from '../../services/order.service';
import {NotificationService} from '../../services/notification.service';



import * as OrderActions  from '../../actions/purchasseOrder.actions';
import * as ContactActions from '../../actions/contact.actions';
import {withLatestFrom, switchMap, catchError, map, tap} from "rxjs/internal/operators";
import {SaveOrderSuccess} from "../../actions/purchasseOrder.actions";
import {AddContacts} from "../../actions/contact.actions";

@Injectable()
export class PurchasseOrderEffectService {

  constructor(
    private store: Store<AppState>,
    private action$: Actions,
    private orderService: OrderService,
    private notif: NotificationService) {
  }

  @Effect() saveOrder$  = this.action$.pipe(
    ofType(OrderActions.SAVE_ORDER),
    withLatestFrom(  this.store.select('order'), this.store.select('customer')),
    switchMap(([payload, order, customer]) =>
      this.orderService.saveOrder(order, customer.id).pipe(
        map((payload) => {
          return new SaveOrderSuccess(payload)
        }),
        catchError(err => {
          this.notif.notify('error', 'Error', err);
          return  of(new OrderActions.SaveOrderFail(err))
        })
      )
    )
  );

  @Effect() saveOrderSuccess$ = this.action$.pipe(
    ofType(OrderActions.SAVE_ORDER_SUCCESS),
    map((data) => new AddContacts(data.payload) )
  )


}
