import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Action} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import {OrderService} from '../../services/order.service';
import {NotificationService} from '../../services/notification.service';

import * as OrdersActions from '../../actions/orders.actions';

@Injectable()
export class OrdersEffectService {

  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private notificationsService: NotificationService) {
  }

  @Effect() getOrders: Observable<Action> = this.actions$
    .ofType(OrdersActions.GET_ORDERS)
    .switchMap(action =>
        // console.log('in effect orders switch map this payload: ', action);
        this.orderService.getOrders(action)
          .map((payload) => {
            this.notificationsService.notify('info', 'get orders', 'data ok');
            return new OrdersActions.GetOrdersSuccess(payload);
          })
          .catch(err => {
            this.notificationsService.notify('error', 'Get orders', err);
            return Observable.of(new OrdersActions.GetOrdersFail(err))
          })
      // return new OrdersActions.GetOrdersSuccess('');

    );

}
