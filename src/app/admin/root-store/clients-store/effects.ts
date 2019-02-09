/**
 * Created by tirli on 05-02-19.
 */
import {ClientsService} from "../../clients/services/clients.service";
import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {Action} from "@ngrx/store";
import {switchMap, map, catchError, tap} from "rxjs/internal/operators";
import * as clientsActions from './actions';
import * as prixZoneMotoActions from '../prix-zone-moto-store/actions';
import * as prixZoneCarActions from '../prix-zone-car-store/actions';

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
              new clientsActions.LoadSuccessAction({ items })
          ),
          catchError(error =>
            of(new clientsActions.LoadFailureAction({ error }))
          )
        )
    )
  );

  @Effect()
  addRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<clientsActions.AddRequestAction>( clientsActions.ClientsActionTypes.ADD_REQUEST ),
    switchMap(action =>
      this.dataService
        .addItem(action.payload.item)
        .pipe(
          tap(data => console.log(data)),
          switchMap(  item =>
            [
                new clientsActions.AddSuccessAction({ item }),
                new prixZoneMotoActions.LoadRequestAction(),
                new prixZoneCarActions.LoadRequestAction()
            ]
          ),
          catchError(error =>
            of(new clientsActions.AddFailureAction({ error }))
          )
        )
    )
  );

  @Effect()
  updateRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<clientsActions.UpdateRequestAction>( clientsActions.ClientsActionTypes.UPDATE_REQUEST ),
    switchMap(action =>
      this.dataService
        .updateItem(action.payload.changes)
        .pipe(
          tap(data => console.log(data)),
          map(
            item =>
              new clientsActions.UpdateSuccessAction({
                item
              })
          ),
          catchError(error =>
            of(new clientsActions.LoadFailureAction({ error }))
          )
        )
    )
  );

}
