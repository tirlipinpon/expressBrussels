import { Action } from '@ngrx/store';
import {Toaster} from "../models/toaster";

export const SET_TOASTER = 'Set Toaster';
export class SetToaster implements Action {
  readonly type = SET_TOASTER;
  constructor(public payload: Toaster) {
     console.log('in actions set toaster message = ',payload);
  }
}

export const SET_TOASTER_SUCCESS = 'Set Toaster Success';
export class SetToasterSuccess implements Action {
  readonly type = SET_TOASTER_SUCCESS;
  constructor(public payload?: any) {
    console.log('in actions get orders sucess payload= ',payload);
  }
}

export const SET_TOASTER_FAIL = 'Set Toaster Fail';
export class SetToasterFail implements Action {
  readonly type = SET_TOASTER_FAIL;
  constructor(public payload: string) {
     // console.log('in actions get orders fail payload= ',payload);
  }
}

export type All =
  SetToaster
  | SetToasterSuccess
  | SetToasterFail;
