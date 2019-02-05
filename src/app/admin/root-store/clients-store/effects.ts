/**
 * Created by tirli on 05-02-19.
 */
import {ClientsService} from "../../clients/services/clients.service";
import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {Action} from "@ngrx/store";
import {switchMap, map, catchError} from "rxjs/internal/operators";
import * as clientsActions from './actions';

@Injectable()
export class ClientsStoreEffects {

  constructor(private dataService: ClientsService, private actions$: Actions) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<clientsActions.LoadRequestAction>(
      clientsActions.ClientsActionTypes.LOAD_REQUEST
    ),
    switchMap(action =>
      this.dataService
        .getItems(action.payload.id)
        .pipe(
          map(result => result.data),
          map(
            items =>
              new clientsActions.LoadSuccessAction({
                items
              })
          ),
          catchError(error =>
            of(new clientsActions.LoadFailureAction({ error }))
          )
        )
    )
  );
}
