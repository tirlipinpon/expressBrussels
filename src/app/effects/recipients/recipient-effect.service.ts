import { Injectable } from '@angular/core';
import {Store, Action} from "@ngrx/store";
import {Actions, Effect} from "@ngrx/effects";
import {RemovalService} from "../../services/removal.service";
import {Observable} from "rxjs";
import * as RecipientActions  from '../../actions/recipient.actions';

@Injectable()
export class RecipientEffectService {

  constructor(
    private action$: Actions,
    private removalService: RemovalService) { }

  @Effect()
  getRecipients: Observable<Action> = this.action$
    .ofType(RecipientActions.GET_RECIPIENTS)
    .switchMap(action =>
      this.removalService.getRemovals(action)
        .map((payload) => {
        let data = payload;
        console.log('in effect getRecipients retrieve data from service =', data);
        return new RecipientActions.GetRecipientsSuccess(data);
      })
        .catch(err => {
          console.log('error in effect get recipients');
          return Observable.of(new RecipientActions.GetRecipientsFail(err))
        })
    );

  @Effect()
  editRecipient: Observable<Action> = this.action$
    .ofType(RecipientActions.EDIT_RECIPIENT)
    .switchMap(action =>
      this.removalService.setRemoval(action)
        .map((payload) => {
          console.log('in effect EDIT recipient retrieved data from service =', payload);
          return new RecipientActions.EditRecipientSuccess(payload);
        })
        .catch(err => {
          console.log('error in effect EDIT removal with error -> ',err);
          return Observable.of(new RecipientActions.EditRecipientFail(err))
        })
    );


}
