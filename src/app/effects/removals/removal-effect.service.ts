import { Injectable } from '@angular/core';
import {Store, Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {RemovalService} from '../../services/removal.service';

import * as RemovalActions  from '../../actions/removal.actions';
import {Observable, of} from 'rxjs';




import {NotificationService} from '../../services/notification.service';
import {switchMap, catchError, map} from "rxjs/internal/operators";

@Injectable()
export class RemovalEffectService {

  constructor(
    private action$: Actions,
    private service: RemovalService,
    private notif: NotificationService) { }

  @Effect() getRemovals = this.action$.pipe(
    ofType(RemovalActions.GET_REMOVALS),
      switchMap(action =>
        this.service.getRemovals(action).pipe(
          map((payload) => {
            let data = payload;
            this.notif.notify('info', 'get Removal OK ', payload.count+'/total');
            return new RemovalActions.GetRemovalsSuccess(data);
          }),
          catchError(err => {
            return of(new RemovalActions.GetRemovalsFail(err))
          })
        )

      )
  )


  @Effect() editRemoval = this.action$.pipe(
    ofType(RemovalActions.EDIT_REMOVAL),
    switchMap(action =>
      this.service.setRemoval(action).pipe(
        map((payload) => {
          console.log('in effect SET removal payload =', payload);
          return new RemovalActions.EditRemovalSuccess(payload);
        }),
        catchError(err => {
          // console.log('error in effect EDIT removal with error -> ',err);
          return of(new RemovalActions.EditRemovalFail(err))
        })
      )
    )
  )


  @Effect() addRemoval = this.action$.pipe(
    ofType(RemovalActions.ADD_REMOVAL),
    switchMap(action =>
      this.service.addRemoval(action).pipe(
        map((payload) => {
          // console.log('in effect add removal retrieved id from service =', payload);
          return new RemovalActions.GetLastRemovalSuccess(payload);
        }),
        catchError(err => {
          // console.log('error in effect EDIT removal with error -> ',err);
          return of(new RemovalActions.AddRemovalFail(err))
        })
      )
    )
  )


  @Effect() deleteRemoval = this.action$.pipe(
    ofType(RemovalActions.DELETE_REMOVAL),
      switchMap(action =>
        this.service.setRemoval(action).pipe(
          map((payload) => {
            let data = payload;
            console.log('in effect DeleteRemoval  from service =', data);
            return new RemovalActions.DeleteRemovalSuccess(data);
          }),
          catchError(err => {
            // console.log('error in effect get removals');
            return of(new RemovalActions.DeleteRemovalFail(err))
          })
        )
      )
  )


  // @Effect() getLastRemoval: Observable<Action> = this.action$
  //   .ofType(RemovalActions.GET_LAST_REMOVAL)
  //   .switchMap(action =>
  //     this.service.getRemovals(action)
  //       .map((payload) => {
  //         let data = payload;
  //         // console.log('in effect getRemovals retrieve data from service =', data);
  //         return new RemovalActions.GetLastRemovalSuccess(data);
  //       })
  //       .catch(err => {
  //         // console.log('error in effect get removals');
  //         return Observable.of(new RemovalActions.GetLastRemovalFail(err))
  //       })
  //   );


}
