/**
 * Created by tirli on 05-02-19.
 */
import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {Action} from "@ngrx/store";
import {switchMap, map, catchError, tap} from "rxjs/internal/operators";
import * as prixZonesMotoActions from './actions';
import {PrixZoneService} from "../../clients/services/prix-zone.service";

@Injectable()
export class PrixZonesMotoStoreEffects {

  constructor(private dataService: PrixZoneService, private actions$: Actions) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<prixZonesMotoActions.LoadRequestAction>(
      prixZonesMotoActions.PrixZonesMotoActionTypes.LOAD_REQUEST
    ),
    switchMap(action =>
      this.dataService
        .getItems('moto')
        .pipe(
          map(result => result.data),
          map(
            items =>
              new prixZonesMotoActions.LoadSuccessAction({ items })
          ),
          catchError(error =>
            of(new prixZonesMotoActions.LoadFailureAction({ error }))
          )
        )
    )
  );

  @Effect()
  addRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<prixZonesMotoActions.AddRequestAction>( prixZonesMotoActions.PrixZonesMotoActionTypes.ADD_REQUEST ),
    switchMap(action =>
      this.dataService
        .addItem(action.payload)
        .pipe(
          tap(data => console.log(data)),
          map(
            item =>
              new prixZonesMotoActions.AddSuccessAction({ item })
          ),
          catchError(error =>
            of(new prixZonesMotoActions.AddFailureAction({ error }))
          )
        )
    )
  );

  @Effect()
  updateRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<prixZonesMotoActions.UpdateRequestAction>( prixZonesMotoActions.PrixZonesMotoActionTypes.UPDATE_REQUEST ),
    switchMap(action =>
      this.dataService
        .updateItem(action.payload.changes, 'moto')
        .pipe(
          tap(data => console.log(data)),
          map(
            item =>
              new prixZonesMotoActions.UpdateSuccessAction({ item })
          ),
          catchError(error =>
            of(new prixZonesMotoActions.LoadFailureAction({ error }))
          )
        )
    )
  );

}
