import { Injectable } from '@angular/core';
import {Actions, Effect } from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import * as fromRoot from '../../shared/appState';
import {AppState} from '../../shared/appState';

import {OrderService} from '../../services/order.service';
import {NotificationService} from '../../services/notification.service';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/withLatestFrom';

import * as OrderActions  from '../../actions/purchasseOrder.actions';

@Injectable()
export class PurchasseOrderEffectService {

  constructor(
    private store: Store<AppState>,
    private action$: Actions,
    private orderService: OrderService,
    private notificationsService: NotificationService) {
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


  @Effect() saveOrder$: Observable<Action> = this.action$
    .ofType(OrderActions.SAVE_ORDER)
    .do(() => {  console.log('- DO log saveOrder$ !'); } )
    .withLatestFrom(  this.store.select('order')   )
    .switchMap(action =>
      this.orderService.saveOrder(action[1], 1)
        .map((payload) => {
           console.log('in effect Save Order retrieved data from service =', payload);
          this.notificationsService.notify('success', 'some alert', payload.message);
          return new OrderActions.SaveOrderSuccess(payload);
        })
        .catch(err => {
          // console.log('error in effect SAVE order with error -> ',err);
          this.notificationsService.notify('error', 'some alert', err);
          return Observable.of(new OrderActions.SaveOrderFail(err))
        })
    ) .catch((error, caught) => {
      console.log('error saveOrder$ ! error: ', error +' caught: ', caught);
      return caught;
    });

}
