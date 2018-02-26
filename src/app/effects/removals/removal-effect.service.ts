import { Injectable } from '@angular/core';
import {Store, Action} from '@ngrx/store';
import {Actions, Effect} from '@ngrx/effects';
import {RemovalService} from '../../services/removal.service';

import * as RemovalActions  from '../../actions/removal.actions';
import {Observable} from 'rxjs/Observable';

import  'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {NotificationService} from "../../services/notification.service";

@Injectable()
export class RemovalEffectService {

  constructor(
    private action$: Actions,
    private service: RemovalService,
    private notif: NotificationService) { }

  @Effect() getRemovals: Observable<Action> = this.action$
    .ofType(RemovalActions.GET_REMOVALS)
    .switchMap(action =>
      this.service.getRemovals(action)
        .map((payload) => {
        let data = payload;
          this.notif.notify('info', 'get Removal OK ', payload.count+'/total');
        return new RemovalActions.GetRemovalsSuccess(data);
      })
        .catch(err => {
          return Observable.of(new RemovalActions.GetRemovalsFail(err))
        })
    );

  @Effect() editRemoval: Observable<Action> = this.action$
    .ofType(RemovalActions.EDIT_REMOVAL)
    .switchMap(action =>
      this.service.setRemoval(action)
        .map((payload) => {
          console.log('in effect SET removal payload =', payload);
          return new RemovalActions.EditRemovalSuccess(payload);
        })
        .catch(err => {
          // console.log('error in effect EDIT removal with error -> ',err);
          return Observable.of(new RemovalActions.EditRemovalFail(err))
        })
    );

  @Effect() addRemoval: Observable<Action> = this.action$
    .ofType(RemovalActions.ADD_REMOVAL)
    .switchMap(action =>
      this.service.addRemoval(action)
        .map((payload) => {
          // console.log('in effect add removal retrieved id from service =', payload);
          return new RemovalActions.GetLastRemovalSuccess(payload);
        })
        .catch(err => {
          // console.log('error in effect EDIT removal with error -> ',err);
          return Observable.of(new RemovalActions.AddRemovalFail(err))
        })
    );

  @Effect() deleteRemoval: Observable<Action> = this.action$
    .ofType(RemovalActions.DELETE_REMOVAL)
    .switchMap(action =>
      this.service.setRemoval(action)
        .map((payload) => {
          let data = payload;
           console.log('in effect DeleteRemoval  from service =', data);
          return new RemovalActions.DeleteRemovalSuccess(data);
        })
        .catch(err => {
          // console.log('error in effect get removals');
          return Observable.of(new RemovalActions.DeleteRemovalFail(err))
        })
    );

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
