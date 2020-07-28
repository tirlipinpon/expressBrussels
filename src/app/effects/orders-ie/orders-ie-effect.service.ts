import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { OrderIEService } from '../../services/order-ie.service';
import {NotificationService} from '../../services/notification.service';

import * as OrdersIEActions from '../../actions/orders-ie.actions';
import {switchMap, map, catchError} from "rxjs/internal/operators";

@Injectable()
export class OrdersIEEffectService {

  constructor(
    private actions$: Actions,
    private orderService: OrderIEService,
    private notif: NotificationService) {
  }

  @Effect() getIeOrders = this.actions$.pipe(
    ofType<OrdersIEActions.GetRequestAction>(OrdersIEActions.ActionTypes.GET_REQUEST),
    switchMap(action =>
      // console.log('in effect orders switch map this payload: ', action);
      this.orderService.getOrders(action).pipe(
        map((payload) => {
          // this.notif.notify('info', 'get orders', 'data ok');
          return new OrdersIEActions.GetSuccessAction(payload);
        }),
        catchError(err => {
          // this.notif.notify('error', 'Get orders', err);
          return of(new OrdersIEActions.GetFailureAction(err))
        })
      )

    )
  )
}
