import { Injectable } from '@angular/core';
import {Store, Action} from "@ngrx/store";
import {Actions, Effect} from "@ngrx/effects";
import {RemovalService} from "../../services/removal.service";

import * as RemovalActions  from '../../actions/removal.actions';
import {Observable} from "rxjs/Observable";

import  'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class RemovalEffectService {

  constructor(
    private action$: Actions,
    private removalService: RemovalService) { }

  @Effect() getRemovals: Observable<Action> = this.action$
    .ofType(RemovalActions.GET_REMOVALS)
    .switchMap(action =>
      this.removalService.getRemovals(action)
        .map((payload) => {
        let data = payload;
        // console.log('in effect getRemovals retrieve data from service =', data);
        return new RemovalActions.GetRemovalsSuccess(data);
      })
        .catch(err => {
          // console.log('error in effect get removals');
          return Observable.of(new RemovalActions.GetRemovalsFail(err))
        })
    );

  @Effect() editRemoval: Observable<Action> = this.action$
    .ofType(RemovalActions.EDIT_REMOVAL)
    .switchMap(action =>
      this.removalService.setRemoval(action)
        .map((payload) => {
          // console.log('in effect EDIT removal retrieved data from service =', payload);
          return new RemovalActions.EditRemovalSuccess(payload);
        })
        .catch(err => {
          // console.log('error in effect EDIT removal with error -> ',err);
          return Observable.of(new RemovalActions.EditRemovalFail(err))
        })
    );


}
