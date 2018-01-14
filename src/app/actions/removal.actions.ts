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
    // console.log('in actions edit removal payload= ',payload);
  }
}

export const EDIT_REMOVAL_SUCCESS = 'Edit Removal Success';
export class EditRemovalSuccess implements Action {
  readonly type = EDIT_REMOVAL_SUCCESS;
  constructor(public payload: DataForm) {
    // console.log('in actions get removal payload= ',payload);
  }
}

export const EDIT_REMOVAL_FAIL = 'Edit Removal Fail';
export class EditRemovalFail implements Action {
  readonly type = EDIT_REMOVAL_FAIL;
  constructor(public payload: string) {
    // console.log('in actions get removal payload= ',payload);
  }
}
//===================================================

export const ADD_REMOVAL = 'Add Removal';
export class AddRemoval implements Action {
  readonly type = ADD_REMOVAL;
  constructor(public payload: DataForm) {
    console.log('in actions add removal payload= ',payload);
  }
}

export const ADD_REMOVAL_SUCCESS = 'Add Removal Success';
export class AddRemovalSuccess implements Action {
  readonly type = ADD_REMOVAL_SUCCESS;
  constructor(public payload: number) {
    console.log('in actions add removal success payload= ',payload);
  }
}

export const ADD_REMOVAL_FAIL = 'Add Removal Fail';
export class AddRemovalFail implements Action {
  readonly type = ADD_REMOVAL_FAIL;
  constructor(public payload: string) {
    // console.log('in actions add removal payload= ',payload);
  }
}
//===================================================
export const GET_LAST_REMOVAL = 'Get last Removal';
export class GetLastRemoval implements Action {
  readonly type = GET_LAST_REMOVAL;
  constructor(public payload: number) {
    // console.log('in actions get customer payload= ',payload);
  }
}

export const GET_LAST_REMOVAL_SUCCESS = 'Get Last Removal Success';
export class GetLastRemovalSuccess implements Action {
  readonly type = GET_LAST_REMOVAL_SUCCESS;
  constructor(public payload: DataDataFormState) {
    // console.log('in actions get customer payload= ',payload);
  }
}

export const GET_LAST_REMOVAL_FAIL = 'Get Last Removal Fail';
export class GetLastRemovalFail implements Action {
  readonly type = GET_LAST_REMOVAL_FAIL;
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
    | EditRemovalFail

    | AddRemoval
    | AddRemovalSuccess
    | AddRemovalFail

    | GetLastRemoval
    | GetLastRemovalSuccess
    | GetLastRemovalFail;

