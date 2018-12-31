import { Injectable } from '@angular/core';
import {Store, Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {RemovalService} from '../../services/removal.service';
import {Observable, of} from 'rxjs';
import * as RecipientActions  from '../../actions/recipient.actions';

import {NotificationService} from '../../services/notification.service';
import {switchMap, map, catchError} from "rxjs/internal/operators";

@Injectable()
export class RecipientEffectService {

  constructor(
    private action$: Actions,
    private service: RemovalService,
    private notif: NotificationService) { }

  @Effect() getRecipients = this.action$.pipe(
    ofType(RecipientActions.GET_RECIPIENTS),
    switchMap(fk_type =>
      this.service.getRemovals(fk_type).pipe(
        map((payload) => {
          let data = payload;
          // this.notif.notify('info', 'get Recipients OK ', payload.count+'/total');
          return new RecipientActions.GetRecipientsSuccess(data);
        }),
        catchError(err => {
          // this.notif.notify('error', 'get Recipients NOK ', err);
          return of(new RecipientActions.GetRecipientsFail(err))
        })
      )

    )
  )


  @Effect() editRecipient = this.action$.pipe(
    ofType(RecipientActions.EDIT_RECIPIENT),
    switchMap(action =>
      this.service.setRemoval(action).pipe(
        map((payload) => {
          // console.log('in effect EDIT recipient retrieved data from service =', payload);
          this.notif.notify('info', 'edit Recipients OK ', payload.name);
          return new RecipientActions.EditRecipientSuccess(payload);
        }),
        catchError(err => {
          // console.log('error in effect EDIT removal with error -> ',err);
          this.notif.notify('error', 'edit Recipients NOK ', err);
          return of(new RecipientActions.EditRecipientFail(err))
        })
      )
    )
  )


  @Effect() addRecipient = this.action$.pipe(
    ofType(RecipientActions.ADD_RECIPIENT),
    switchMap(action =>
      this.service.addRemoval(action).pipe(
        map((payload) => {
          // console.log('in effect add removal retrieved i d from service =', payload);
          this.notif.notify('info', 'add Recipients OK ', payload.name);
          return new RecipientActions.GetLastRecipientSuccess(payload);
        }),
        catchError(err => {
          // console.log('error in effect EDIT removal with error -> ',err);
          this.notif.notify('error', 'add Recipients NOK', err);
          return of(new RecipientActions.AddRecipientFail(err))
        })
      )
    )
  )


  @Effect() deleteRecipient = this.action$.pipe(
    ofType(RecipientActions.DELETE_RECIPIENT),
    switchMap(action =>
      this.service.setRemoval(action).pipe(
        map((payload) => {
          let data = payload;
          // console.log('in effect DeleteRemoval  from service =', data);
          this.notif.notify('info', 'Delete Recipients OK ', payload.active === '1' ? payload.name + ' activated' : payload.name + ' disabled');
          return new RecipientActions.DeleteRecipientSuccess(data);
        }),
        catchError(err => {
          // console.log('error in effect get removals');
          this.notif.notify('error', 'Delete Recipients NOK', err);
          return of(new RecipientActions.DeleteRecipientFail(err))
        })
      )
    )
  )

}
