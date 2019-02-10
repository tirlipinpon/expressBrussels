/**
 * Created by tirli on 05-02-19.
 */
import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {Action} from "@ngrx/store";
import {switchMap, map, catchError, tap} from "rxjs/internal/operators";
import * as prixZonesCarActions from './actions';
import {PrixZoneService} from "../../clients/services/prix-zone.service";

@Injectable()
export class PrixZonesCarStoreEffects {

  constructor(private dataService: PrixZoneService, private actions$: Actions) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<prixZonesCarActions.LoadRequestAction>(
      prixZonesCarActions.PrixZonesCarActionTypes.LOAD_REQUEST
    ),
    switchMap(action =>
      this.dataService
        .getItems('camionnette')
        .pipe(
          map(result => result.data),
          map(
            items =>
              new prixZonesCarActions.LoadSuccessAction({ items })
          ),
          catchError(error =>
            of(new prixZonesCarActions.LoadFailureAction({ error }))
          )
        )
    )
  );

  @Effect()
  addRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<prixZonesCarActions.AddRequestAction>( prixZonesCarActions.PrixZonesCarActionTypes.ADD_REQUEST ),
    switchMap(action =>
      this.dataService
        .addItem(action.payload)
        .pipe(
          tap(data => console.log(data)),
          map(
            item =>
              new prixZonesCarActions.AddSuccessAction({ item })
          ),
          catchError(error =>
            of(new prixZonesCarActions.AddFailureAction({ error }))
          )
        )
    )
  );

  @Effect()
  updateRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<prixZonesCarActions.UpdateRequestAction>( prixZonesCarActions.PrixZonesCarActionTypes.UPDATE_REQUEST ),
    switchMap(action =>
      this.dataService
        .updateItem(action.payload.changes, 'camionnette')
        .pipe(
          tap(data => console.log(data)),
          map(
            item =>
              new prixZonesCarActions.UpdateSuccessAction({ item })
          ),
          catchError(error =>
            of(new prixZonesCarActions.LoadFailureAction({ error }))
          )
        )
    )
  );

}
