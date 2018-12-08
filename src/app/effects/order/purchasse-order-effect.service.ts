import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import {AppState} from '../../shared/appState';
import {OrderService} from '../../services/order.service';
import {NotificationService} from '../../services/notification.service';



import * as OrderActions  from '../../actions/purchasseOrder.actions';
import * as ContactActions from '../../actions/contact.actions';
import {withLatestFrom, switchMap, catchError, map} from "rxjs/internal/operators";

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
    withLatestFrom(  this.store.select('order')   ),
    switchMap(action =>
      this.orderService.saveOrder(action[1], 1).pipe(
        switchMap((payload) => {
          this.notif.notify('info', 'Order created', payload.message);
          return  of(new OrderActions.SaveOrderSuccess(action))
        }),
        catchError(err => {
          this.notif.notify('error', 'Error', err);
          return  of(new OrderActions.SaveOrderFail(err))
        })
      )

    )
  )


  @Effect() saveOrderSuccess$ = this.action$.pipe(
    ofType(OrderActions.SAVE_ORDER_SUCCESS),
    map(action =>  new ContactActions.AddContacts(action) )
  )


}
