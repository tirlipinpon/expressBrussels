import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from "@ngrx/effects";
import {AppState} from "../../shared/appState";
import {Store} from "@ngrx/store";
import {switchMap, map, catchError} from "rxjs/internal/operators";
import {SET_TOASTER, SET_TOASTER_SUCCESS} from "../../actions/toaster.actions";

@Injectable()
export class ToasterEffectService {

  constructor(private store: Store<AppState>,
              private action$: Actions) { }

  // @Effect() addToaster = this.action$.pipe(
  //   ofType(SET_TOASTER),
  //   switchMap((data) =>
  //     this.notif.notify('error', 'add contact NOK ', data)
  //   )
  // );


}
