/**
 * Created by tirli on 16-02-19.
 */
import {Injectable} from "@angular/core";
import {Effect, Actions, ofType} from "@ngrx/effects";
import {Action} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {switchMap, map, catchError, tap} from "rxjs/internal/operators";
import {OrderTranslateService} from "../../services/order-translate.service";
import * as orderTranslateActions from './actions';
import {NotificationService} from "../../../services/notification.service";

@Injectable()
export class OrderTranslateStoreEffects {
  constructor(private orderTranslateService: OrderTranslateService,
              private actions$: Actions,
              private notificationsService: NotificationService) {}

  @Effect()
  addRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<orderTranslateActions.AddRequestAction>( orderTranslateActions.ActionTypes.ADD_REQUEST ),
    switchMap(action =>
      this.orderTranslateService
        .addItem(action.payload.item)
        .pipe(
          map(  item =>  new orderTranslateActions.AddSuccessAction({ item }) ),
          catchError(error =>
            of(new orderTranslateActions.AddFailureAction({ error }))
          )
        )
    )
  );

  @Effect({dispatch: false})
  addSuccessEffect$  = this.actions$.pipe(
    ofType<orderTranslateActions.AddSuccessAction>( orderTranslateActions.ActionTypes.ADD_SUCCESS ),
    map(action => {
        this.notificationsService.notify('success',
          'order translate '+ action.payload.item.uuid +' added success',
          'with id : '+ action.payload.item.id)
      }
    )
  );

}
