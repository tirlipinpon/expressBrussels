/**
 * Created by tirli on 13-02-19.
 */

import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {Action} from "@ngrx/store";
import {switchMap, map, catchError, tap} from "rxjs/internal/operators";
import * as ImportExportActions from './actions';
import {NotificationService} from "../../../services/notification.service";
import {ImportExportService} from "../../i-e/services/i-e.service";


@Injectable()
export class ImportExportStoreEffects {

  constructor(private dataService: ImportExportService,
              private actions$: Actions,
              private notificationsService: NotificationService) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<ImportExportActions.LoadRequestAction>(
      ImportExportActions.ImportExportActionTypes.LOAD_REQUEST
    ),
    switchMap(action =>
      this.dataService
        .getItems()
        .pipe(
          map(result => result),
          map( items => new ImportExportActions.LoadSuccessAction({ items }) ),
          catchError(error =>
            [
              new ImportExportActions.LoadFailureAction({ error }),
              new ImportExportActions.SetFailureAction({ error })
            ]
          )
        )
    )
  );


  @Effect()
  updateRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<ImportExportActions.UpdateRequestAction>( ImportExportActions.ImportExportActionTypes.UPDATE_REQUEST ),
    switchMap(action =>
      this.dataService
        .updateItem(action.payload.changes)
        .pipe(
          map( item => new ImportExportActions.UpdateSuccessAction({item}) ),
          catchError(error =>
            of(new ImportExportActions.LoadFailureAction({ error }))
          )
        )
    )
  );

  @Effect()
  updateAdministrationRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<ImportExportActions.UpdateAdminRequestAction>
    (ImportExportActions.ImportExportActionTypes.UPDATE_ADMINISTRATIONS_REQUEST),
    switchMap(action =>
      this.dataService.updateItemAdministration(action.payload.items).pipe(
          map( items => new ImportExportActions.UpdateAdminSuccessAction({items}) ),
          catchError(error =>
            of(new ImportExportActions.LoadFailureAction({ error }))
          )
        )
    )
  );
}
