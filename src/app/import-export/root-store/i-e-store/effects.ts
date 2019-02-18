/**
 * Created by tirli on 18-02-19.
 */
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import * as IEActions from './actions';
import {OrderIEService} from "../../services/order-i-e.service";

@Injectable()
export class ImportExportStoreEffects {
  constructor(private dataService: OrderIEService, private actions$: Actions) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<IEActions.AddRequestAction>( IEActions.ActionTypes.ADD_REQUEST  ),
    switchMap(action =>
      this.dataService
        .addItem(action.payload.item)
        .pipe(
          map(
            item =>
              new IEActions.AddSuccessAction({  item  })
          ),
          catchError(error =>
            observableOf(new IEActions.AddFailureAction({ error }))
          )
        )
    )
  );
}
