import { Injectable } from '@angular/core';
import {Actions, Effect } from "@ngrx/effects";
import {OrderService} from "../../services/order.service";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";

import 'rxjs/add/operator/mergeMap'

import * as OrderActions  from '../../actions/purchasseOrder.actions';


@Injectable()
export class PurchasseOrderEffectService {

  constructor(
    private action$: Actions,
    private orderService: OrderService) { }

  // @Effect()
  // iniOrder$: Observable<Action> = this.action$
  //   .ofType(OrderActions.INIT_ORDER)
  //   .map((action: OrderActions.InitOrder) => {
  //     return new OrderActions.InitOrderSuccess();
  // });

  @Effect()
  editOrder$: Observable<Action> = this.action$
    .ofType(OrderActions.EDIT_ORDER_OPTION)
    .map((action: OrderActions.EditOrderOption) => {
      return new OrderActions.EditOrderOptionSuccess(action.payload);
    });

  // @Effect()
  // editOrderRemoval$: Observable<Action> = this.action$
  //   .ofType(OrderActions.EDIT_ORDER_REMOVAL)
  //   .map((action: OrderActions.EditOrderRemoval) => {
  //     return new OrderActions.EditOrderRemovalSuccess(action.payload);
  //   });


  @Effect()
  editOrderRemoval$: Observable<Action> = this.action$
    .ofType(OrderActions.EDIT_ORDER_REMOVAL)
    .mergeMap((action: OrderActions.EditOrderRemoval) => {
      return [
         new OrderActions.EditOrderRemovalSuccess(action.payload),
         new OrderActions.EditOrderRemovalInfosSuccess({info1:'',info2:''})
      ];
    });


  @Effect()
  editOrderRecipient$: Observable<Action> = this.action$
    .ofType(OrderActions.EDIT_ORDER_RECIPIENT)
    .mergeMap((action: OrderActions.EditOrderRecipient) => {
      return [
        new OrderActions.EditOrderRecipientSuccess(action.payload),
        new OrderActions.EditOrderRecipientInfosSuccess({info1:'',info2:''})
      ]
    });

  @Effect()
  editOrderRemovalInfos$: Observable<Action> = this.action$
    .ofType(OrderActions.EDIT_ORDER_REMOVAL_INFOS)
    .map((action: OrderActions.EditOrderRemovalInfos) => {
      return new OrderActions.EditOrderRemovalInfosSuccess(action.payload);
    });

  @Effect()
  editRecipientInfos$: Observable<Action> = this.action$
    .ofType(OrderActions.EDIT_ORDER_RECIPIENT_INFOS)
    .map((action: OrderActions.EditOrderRecipientInfos) => {
      return new OrderActions.EditOrderRecipientInfosSuccess(action.payload);
    });
}
