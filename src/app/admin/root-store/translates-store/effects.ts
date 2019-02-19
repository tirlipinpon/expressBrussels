/**
 * Created by tirli on 13-02-19.
 */

import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {Action} from "@ngrx/store";
import {switchMap, map, catchError, tap} from "rxjs/internal/operators";
import * as translatesActions from './actions';
import {NotificationService} from "../../../services/notification.service";
import {TranslatesService} from "../../translate/services/translates.service";

@Injectable()
export class TranslatesStoreEffects {

  constructor(private dataService: TranslatesService,
              private actions$: Actions,
              private notificationsService: NotificationService) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<translatesActions.LoadRequestAction>(
      translatesActions.TranslatesActionTypes.LOAD_REQUEST
    ),
    switchMap(action =>
      this.dataService
        .getItems()
        .pipe(
          map(result => result),
          map(
            items =>
              new translatesActions.LoadSuccessAction({ items })
          ),
          catchError(error =>
            [
              new translatesActions.LoadFailureAction({ error }),
              new translatesActions.SetFailureAction({ error })
            ]
          )
        )
    )
  );


  @Effect()
  updateRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<translatesActions.UpdateRequestAction>( translatesActions.TranslatesActionTypes.UPDATE_REQUEST ),
    switchMap(action =>
      this.dataService
        .updateItem(action.payload.changes)
        .pipe(
          map(
            item =>
              new translatesActions.UpdateSuccessAction({item})
          ),
          catchError(error =>
            of(new translatesActions.LoadFailureAction({ error }))
          )
        )
    )
  );

}
