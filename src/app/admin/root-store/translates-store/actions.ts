import { Action } from '@ngrx/store';
import {OrderTranslate} from "../../../models/translate";

export enum TranslatesActionTypes {
  LOAD_REQUEST = '[TRANSLATES] LOAD REQUEST',
  LOAD_FAILURE = '[TRANSLATES] LOAD FAILURE',
  LOAD_SUCCESS = '[TRANSLATES] LOAD SUCCESS',

  UPDATE_REQUEST = '[TRANSLATES] UPDATE REQUEST',
  UPDATE_FAILURE = '[TRANSLATES] UPDATE FAILURE',
  UPDATE_SUCCESS = '[TRANSLATES] UPDATE SUCCESS',

  SET_FAILURE = '[TRANSLATES] SET FAILURE'
}
// ================= LOAD ALL ===============
export class LoadRequestAction implements Action {
  readonly type = TranslatesActionTypes.LOAD_REQUEST;
  constructor() {}
}
export class LoadFailureAction implements Action {
  readonly type = TranslatesActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class LoadSuccessAction implements Action {
  readonly type = TranslatesActionTypes.LOAD_SUCCESS;
  constructor(public payload: { items: OrderTranslate[] }) {}
}
// ================= UPDATE ONE ===============
export class UpdateRequestAction implements Action {
  readonly type = TranslatesActionTypes.UPDATE_REQUEST;
  constructor(public payload: {
    id: number,
    changes: OrderTranslate
  }) {}
}
export class UpdateFailureAction implements Action {
  readonly type = TranslatesActionTypes.UPDATE_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class UpdateSuccessAction implements Action {
  readonly type = TranslatesActionTypes.UPDATE_SUCCESS;
  constructor(public payload: { item: OrderTranslate }) {}
}
// ================= SET FAILURE ===============
export class SetFailureAction implements Action {
  readonly type = TranslatesActionTypes.SET_FAILURE;
  constructor(public payload: { error: string }) {}
}


export type Actions =
    LoadRequestAction |
    LoadFailureAction |
    LoadSuccessAction |

    UpdateRequestAction |
    UpdateFailureAction |
    UpdateSuccessAction |

    SetFailureAction;

