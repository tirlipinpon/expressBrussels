import { Action } from '@ngrx/store';
import {DataForm, DataDataFormState} from "../models/DataForm";


export const GET_REMOVALS = 'Get Removals';
export class GetRemovals implements Action {
  readonly type = GET_REMOVALS;
  constructor(public payload: number) {
    // console.log('in actions get customer payload= ',payload);
  }
}

export const GET_REMOVALS_SUCCESS = 'Get Removals Success';
export class GetRemovalsSuccess implements Action {
  readonly type = GET_REMOVALS_SUCCESS;
  constructor(public payload: DataDataFormState) {
    // console.log('in actions get customer payload= ',payload);
  }
}

export const GET_REMOVALS_FAIL = 'Get Removals Fail';
export class GetRemovalsFail implements Action {
  readonly type = GET_REMOVALS_FAIL;
  constructor(public payload: string) {
    // console.log('in actions get customer payload= ',payload);
  }
}

//===================================================

export const EDIT_REMOVAL = 'Edit Removal';
export class EditRemoval implements Action {
  readonly type = EDIT_REMOVAL;
  constructor(public payload: DataForm) {
    // console.log('in actions edit customer payload= ',payload);
  }
}

export const EDIT_REMOVAL_SUCCESS = 'Edit Removal Success';
export class EditRemovalSuccess implements Action {
  readonly type = EDIT_REMOVAL_SUCCESS;
  constructor(public payload: DataForm) {
    // console.log('in actions get customer payload= ',payload);
  }
}

export const EDIT_REMOVAL_FAIL = 'Edit Removal Fail';
export class EditRemovalFail implements Action {
  readonly type = EDIT_REMOVAL_FAIL;
  constructor(public payload: string) {
    // console.log('in actions get customer payload= ',payload);
  }
}

export type All =
  GetRemovals
    | GetRemovalsSuccess
    | GetRemovalsFail

    | EditRemoval
    | EditRemovalSuccess
    | EditRemovalFail;
