/**
 * Created by tirli on 18-02-19.
 */
import { Action } from '@ngrx/store';
import {ImportExport} from "../../../models/import-export";

export enum ActionTypes {
  ADD_REQUEST = '[Import/Export] Add Request',
  ADD_SUCCESS = '[Import/Export] Add Success',
  ADD_FAILURE = '[Import/Export] Add Failure'
}

export class AddRequestAction implements Action {
  readonly type = ActionTypes.ADD_REQUEST;
  constructor(public payload: { item: ImportExport}) {}
}
export class AddSuccessAction implements Action {
  readonly type = ActionTypes.ADD_SUCCESS;
  constructor(public payload: { item: ImportExport}) {}
}
export class AddFailureAction implements Action {
  readonly type = ActionTypes.ADD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export type IEActions = AddRequestAction | AddFailureAction | AddSuccessAction;
