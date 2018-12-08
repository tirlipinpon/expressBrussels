import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {OrderService} from '../../services/order.service';
import {NotificationService} from '../../services/notification.service';

import * as OrdersActions from '../../actions/orders.actions';
import {switchMap, map, catchError} from "rxjs/internal/operators";

@Injectable()
export class OrdersEffectService {

  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private notif: NotificationService) {
  }

  @Effect() getOrders  = this.actions$.pipe(
    ofType(OrdersActions.GET_ORDERS),
    switchMap(action =>
      // console.log('in effect orders switch map this payload: ', action);
      this.orderService.getOrders(action).pipe(
        map((payload) => {
          this.notif.notify('info', 'get orders', 'data ok');
          return new OrdersActions.GetOrdersSuccess(payload);
        }),
        catchError(err => {
          this.notif.notify('error', 'Get orders', err);
          return  of(new OrdersActions.GetOrdersFail(err))
        })
      )

    )
  )


}
