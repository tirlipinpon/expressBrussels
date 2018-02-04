import { Injectable } from '@angular/core';
import {Store, Action} from "@ngrx/store";
import {Actions, Effect} from "@ngrx/effects";
import {RemovalService} from "../../services/removal.service";
import {Observable} from "rxjs/Observable";
import * as RecipientActions  from '../../actions/recipient.actions';
import  'rxjs/add/operator/switchMap';

@Injectable()
export class RecipientEffectService {

  constructor(
    private action$: Actions,
    private service: RemovalService) { }

  @Effect() getRecipients: Observable<Action> = this.action$
    .ofType(RecipientActions.GET_RECIPIENTS)
    .switchMap(fk_type =>
      this.service.getRemovals(fk_type)
        .map((payload) => {
        let data = payload;
        return new RecipientActions.GetRecipientsSuccess(data);
      })
        .catch(err => {
          return Observable.of(new RecipientActions.GetRecipientsFail(err))
        })
    );

  @Effect() editRecipient: Observable<Action> = this.action$
    .ofType(RecipientActions.EDIT_RECIPIENT)
    .switchMap(action =>
      this.service.setRemoval(action)
        .map((payload) => {
          // console.log('in effect EDIT recipient retrieved data from service =', payload);
          return new RecipientActions.EditRecipientSuccess(payload);
        })
        .catch(err => {
          // console.log('error in effect EDIT removal with error -> ',err);
          return Observable.of(new RecipientActions.EditRecipientFail(err))
        })
    );

  @Effect() addRecipient: Observable<Action> = this.action$
    .ofType(RecipientActions.ADD_RECIPIENT)
    .switchMap(action =>
      this.service.addRemoval(action)
        .map((payload) => {
          // console.log('in effect add removal retrieved i d from service =', payload);
          return new RecipientActions.GetLastRecipientSuccess(payload);
        })
        .catch(err => {
          // console.log('error in effect EDIT removal with error -> ',err);
          return Observable.of(new RecipientActions.AddRecipientFail(err))
        })
    );

  @Effect() deleteRecipient: Observable<Action> = this.action$
    .ofType(RecipientActions.DELETE_RECIPIENT)
    .switchMap(action =>
      this.service.setRemoval(action)
        .map((payload) => {
          let data = payload;
          // console.log('in effect DeleteRemoval  from service =', data);
          return new RecipientActions.DeleteRecipientSuccess(data);
        })
        .catch(err => {
          // console.log('error in effect get removals');
          return Observable.of(new RecipientActions.DeleteRecipientFail(err))
        })
    );



}
