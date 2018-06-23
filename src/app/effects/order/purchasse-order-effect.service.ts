import { Injectable } from '@angular/core';
import {Actions, Effect } from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import {AppState} from '../../shared/appState';
import {OrderService} from '../../services/order.service';
import {NotificationService} from '../../services/notification.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/withLatestFrom';
import * as OrderActions  from '../../actions/purchasseOrder.actions';
import * as ContactActions from '../../actions/contact.actions';

@Injectable()
export class PurchasseOrderEffectService {

  constructor(
    private store: Store<AppState>,
    private action$: Actions,
    private orderService: OrderService,
    private notif: NotificationService) {
  }

  @Effect() saveOrder$: Observable<Action> = this.action$
    .ofType(OrderActions.SAVE_ORDER)
    // .do(() => {  console.log('- DO log saveOrder$ !'); } )
    .withLatestFrom(  this.store.select('order')   )
    .switchMap(action =>
      this.orderService.saveOrder(action[1], 1)
        .switchMap((payload) => {
          this.notif.notify('info', 'some alert', payload.message);
           return Observable.of(new OrderActions.SaveOrderSuccess(action))
        })
        .catch(err => {
          this.notif.notify('error', 'some alert', err);
          return Observable.of(new OrderActions.SaveOrderFail(err))
        })
    );

  @Effect() saveOrderSuccess$: Observable<Action> = this.action$
    .ofType(OrderActions.SAVE_ORDER_SUCCESS)
    .map(action =>  new ContactActions.AddContacts(action)
    );

}
