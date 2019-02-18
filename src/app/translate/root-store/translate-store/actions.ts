/**
 * Created by tirli on 16-02-19.
 */
import { Action } from '@ngrx/store';
import {OrderTranslate} from "../../../models/translate";

export enum ActionTypes {
  ADD_REQUEST = '[OrderTranslate] ADD Request',
  ADD_SUCCESS = '[OrderTranslate] ADD Success',
  ADD_FAILURE = '[OrderTranslate] ADD Failure',

  READ_REQUEST = '[OrderTranslate] READ Request',
  READ_SUCCESS = '[OrderTranslate] READ Success',
  READ_FAILURE = '[OrderTranslate] READ Failure',

  UPDATE_REQUEST = '[OrderTranslate] UPDATE Request',
  UPDATE_SUCCESS = '[OrderTranslate] UPDATE Success',
  UPDATE_FAILURE = '[OrderTranslate] UPDATE Failure'
}
// ====================   ADD   =================================
export class AddRequestAction implements Action {
  readonly type = ActionTypes.ADD_REQUEST;
  constructor(public payload: { item: OrderTranslate }) {}
}
export class AddSuccessAction implements Action {
  readonly type = ActionTypes.ADD_SUCCESS;
  constructor(public payload: { item: OrderTranslate }) {}
}
export class AddFailureAction implements Action {
  readonly type = ActionTypes.ADD_FAILURE;
  constructor(public payload: { error: string }) {}
}
// ====================   READ  =================================
export class ReadRequestAction implements Action {
  readonly type = ActionTypes.READ_REQUEST;
  constructor(public payload: { id: number }) {}
}
export class ReadSuccessAction implements Action {
  readonly type = ActionTypes.READ_SUCCESS;
  constructor(public payload: { items: OrderTranslate[] }) {}
}
export class ReadFailureAction implements Action {
  readonly type = ActionTypes.READ_FAILURE;
  constructor(public payload: { error: string }) {}
}
// ====================   UPDATE  =================================
export class UpdateRequestAction implements Action {
  readonly type = ActionTypes.UPDATE_REQUEST;
  constructor(public payload: { item: OrderTranslate }) {}
}
export class UpdateSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;
  constructor(public payload: { id: number, changes: OrderTranslate  }) {}
}
export class UpdateFailureAction implements Action {
  readonly type = ActionTypes.UPDATE_FAILURE;
  constructor(public payload: { error: string }) {}
}
export type Actions =
    AddRequestAction
  | AddFailureAction
  | AddSuccessAction

  | ReadRequestAction
  | ReadFailureAction
  | ReadSuccessAction

  | UpdateRequestAction
  | UpdateFailureAction
  | UpdateSuccessAction;
