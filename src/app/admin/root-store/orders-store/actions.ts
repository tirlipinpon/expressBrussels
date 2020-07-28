import { Action } from '@ngrx/store';
import {PurchasseOrder} from "../../../models/PurchasseOrder";

export enum OrdersActionTypes {
  LOAD_REQUEST = '[ORDERS] LOAD REQUEST',
  LOAD_FAILURE = '[ORDERS] LOAD FAILURE',
  LOAD_SUCCESS = '[ORDERS] LOAD SUCCESS',

  UPDATE_REQUEST = '[ORDERS] UPDATE REQUEST',
  UPDATE_FAILURE = '[ORDERS] UPDATE FAILURE',
  UPDATE_SUCCESS = '[ORDERS] UPDATE SUCCESS',
  RESET = '[ORDERS] RESET',

  SET_FAILURE = '[ORDERS] SET FAILURE'
}
// ================= LOAD ===============
export class LoadRequestAction implements Action {
  readonly type = OrdersActionTypes.LOAD_REQUEST;
  constructor(public payload: number) {}
}
export class LoadFailureAction implements Action {
  readonly type = OrdersActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class LoadSuccessAction implements Action {
  readonly type = OrdersActionTypes.LOAD_SUCCESS;
  constructor(public payload: { items: PurchasseOrder[] }) {}
}
// ================= UPDATE ONE ===============
export class UpdateRequestAction implements Action {
  readonly type = OrdersActionTypes.UPDATE_REQUEST;
  constructor(public payload: {
    id: number,
    changes: PurchasseOrder
  }) {}
}
export class UpdateFailureAction implements Action {
  readonly type = OrdersActionTypes.UPDATE_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class UpdateSuccessAction implements Action {
  readonly type = OrdersActionTypes.UPDATE_SUCCESS;
  constructor(public payload: { item: PurchasseOrder }) {}
}
// ================= SET FAILURE ===============
export class SetFailureAction implements Action {
  readonly type = OrdersActionTypes.SET_FAILURE;
  constructor(public payload: { error: string }) {}
}


export class ResetRequestAction implements Action {
  readonly type = OrdersActionTypes.RESET;
  constructor() {}
}

export type Actions =
    LoadRequestAction |
    LoadFailureAction |
    LoadSuccessAction |

    UpdateRequestAction |
    UpdateFailureAction |
    UpdateSuccessAction |
    ResetRequestAction |

    SetFailureAction;

