/**
 * Created by tirli on 13-02-19.
 */

import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {Action} from "@ngrx/store";
import {switchMap, map, catchError, tap} from "rxjs/internal/operators";
import * as ordersActions from './actions';
import {NotificationService} from "../../../services/notification.service";
import {OrdersService} from "../../orders/services/orders.service";

@Injectable()
export class OrdersStoreEffects {

  constructor(private dataService: OrdersService,
              private actions$: Actions,
              private notificationsService: NotificationService) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<ordersActions.LoadRequestAction>(
      ordersActions.OrdersActionTypes.LOAD_REQUEST
    ),
    switchMap(action =>
      this.dataService
        .getItems(action.payload)
        .pipe(
          map(result => result),
          map(
            items =>
              new ordersActions.LoadSuccessAction({ items })
          ),
          catchError(error =>
            [
              new ordersActions.LoadFailureAction({ error }),
              new ordersActions.SetFailureAction({ error })
            ]
          )
        )
    )
  );


  @Effect()
  updateRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<ordersActions.UpdateRequestAction>( ordersActions.OrdersActionTypes.UPDATE_REQUEST ),
    switchMap(action =>
      this.dataService
        .updateItem(action.payload.changes)
        .pipe(
          map(
            item =>
              new ordersActions.UpdateSuccessAction({item})
          ),
          catchError(error =>
            of(new ordersActions.LoadFailureAction({ error }))
          )
        )
    )
  );

}
