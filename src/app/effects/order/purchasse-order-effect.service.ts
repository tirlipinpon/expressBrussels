import { Injectable } from '@angular/core';
import {Actions, Effect } from "@ngrx/effects";
import {OrderService} from "../../services/order.service";
import {Observable} from "rxjs/Observable";
import {Action, Store} from "@ngrx/store";
import {AppState} from "../../shared/appState";
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/withLatestFrom';

import * as OrderActions  from '../../actions/purchasseOrder.actions';
import {PurchasseOrder} from "../../models/PurchasseOrder";
import {NotificationService} from "../../services/notification.service";

@Injectable()
export class PurchasseOrderEffectService {

  order$: Observable<PurchasseOrder>;

  constructor(
    private store: Store<AppState>,
    private action$: Actions,
    private orderService: OrderService,
    private notificationsService: NotificationService) {
    this.order$ = store.select('order');
  }

  // @Effect()
  // iniOrder$: Observable<Action> = this.action$
  //   .ofType(OrderActions.INIT_ORDER)
  //   .map((action: OrderActions.InitOrder) => {
  //     return new OrderActions.InitOrderSuccess();
  // });

  // @Effect() editOrderRemoval$: Observable<Action> = this.action$
  //   .ofType(OrderActions.EDIT_ORDER_REMOVAL)
  //   .map((action: OrderActions.EditOrderRemoval) => {
  //     return new OrderActions.EditOrderRemovalSuccess(action.payload);
  //   });

  @Effect() editOrder$: Observable<Action> = this.action$
    .ofType(OrderActions.EDIT_ORDER_OPTION)
    .map((action: OrderActions.EditOrderOption) => {
      return new OrderActions.EditOrderOptionSuccess(action.payload);
    });

  @Effect() editOrderRemoval$: Observable<Action> = this.action$
    .ofType(OrderActions.EDIT_ORDER_REMOVAL)
    .mergeMap((action: OrderActions.EditOrderRemoval) => {
      return [
         new OrderActions.EditOrderRemovalSuccess(action.payload),
         new OrderActions.EditOrderRemovalInfosSuccess({info1:'',info2:''})
      ];
    });

  @Effect() editOrderRecipient$: Observable<Action> = this.action$
    .ofType(OrderActions.EDIT_ORDER_RECIPIENT)
    .mergeMap((action: OrderActions.EditOrderRecipient) => {
      return [
        new OrderActions.EditOrderRecipientSuccess(action.payload),
        new OrderActions.EditOrderRecipientInfosSuccess({info1:'',info2:''})
      ]
    });

  @Effect() editOrderRemovalInfos$: Observable<Action> = this.action$
    .ofType(OrderActions.EDIT_ORDER_REMOVAL_INFOS)
    .map((action: OrderActions.EditOrderRemovalInfos) => {
      return new OrderActions.EditOrderRemovalInfosSuccess(action.payload);
    });

  @Effect() editRecipientInfos$: Observable<Action> = this.action$
    .ofType(OrderActions.EDIT_ORDER_RECIPIENT_INFOS)
    .map((action: OrderActions.EditOrderRecipientInfos) => {
      return new OrderActions.EditOrderRecipientInfosSuccess(action.payload);
    });

  @Effect() saveOrder$: Observable<Action> = this.action$
    .ofType(OrderActions.SAVE_ORDER)
    .withLatestFrom(  this.store.select('order')  )
    .switchMap(action =>
      this.orderService.saveOrder(action[1])
        .map((payload) => {
          // console.log('in effect Save Order retrieved data from service =', payload);
          this.notificationsService.notify('success', 'some alert', payload.message);
          return new OrderActions.SaveOrderSuccess(payload);
        })
        .catch(err => {
          // console.log('error in effect SAVE order with error -> ',err);
          this.notificationsService.notify('error', 'some alert', err);
          return Observable.of(new OrderActions.SaveOrderFail(err))
        })
    );

}
