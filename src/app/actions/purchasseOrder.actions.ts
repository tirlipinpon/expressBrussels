import { Action } from '@ngrx/store';
import {PurchasseOrder} from '../models/PurchasseOrder';

export const INIT_ORDER = 'Init Order';
export class InitOrder implements Action {
  readonly type = INIT_ORDER;
  constructor(public payload: number) {
    // console.log('in actions get customer payload= ',payload);
  }
}

export const INIT_ORDER_SUCCESS = 'Init Order Success';
export class InitOrderSuccess implements Action {
  readonly type = INIT_ORDER_SUCCESS;
  constructor() {
    // console.log('in actions get customer payload= ',payload);
  }
}
//===================== removal ==============================
export const EDIT_ORDER_REMOVAL = 'Edit Order Removal';
export class EditOrderRemoval implements Action {
  readonly type = EDIT_ORDER_REMOVAL;
  constructor(public payload: number) {
    // console.log('in actions get customer payload= ',payload);
  }
}
//==================== recipient ===============================
export const EDIT_ORDER_RECIPIENT = 'Edit Order Recipient';
export class EditOrderRecipient implements Action {
  readonly type = EDIT_ORDER_RECIPIENT;
  constructor(public payload: number) {
    // console.log('in actions get customer payload= ',payload);
  }
}
//==================== removal infos ===============================
export const EDIT_ORDER_REMOVAL_INFOS = 'Edit Order Removal Infos';
export class EditOrderRemovalInfos implements Action {
  readonly type = EDIT_ORDER_REMOVAL_INFOS;
  constructor(public payload: any) {
    // console.log('in actions get customer payload= ',payload);
  }
}
//==================== recipient infos ===============================
export const EDIT_ORDER_RECIPIENT_INFOS = 'Edit Order Recipient Infos';
export class EditOrderRecipientInfos implements Action {
  readonly type = EDIT_ORDER_RECIPIENT_INFOS;
  constructor(public payload: any) {
    // console.log('in actions get customer payload= ',payload);
  }
}
//=================== options ================================
export const EDIT_ORDER_OPTION = 'Edit Order option';
export class EditOrderOption implements Action {
  readonly type = EDIT_ORDER_OPTION;
  constructor(public payload: PurchasseOrder) {
    // console.log('in actions get customer payload= ',payload);
  }
}
//================= save order ==================================
export const SAVE_ORDER = 'Save Order';
export class SaveOrder implements Action {
  readonly type = SAVE_ORDER;
}

export const SAVE_ORDER_SUCCESS = 'Save Order Success';
export class SaveOrderSuccess implements Action {
  readonly type = SAVE_ORDER_SUCCESS;
  constructor(public payload: any) {
    // console.log('in actions save Order  payload= ',payload);
  }
}

export const SAVE_ORDER_FAIL = 'Save Order Fail';
export class SaveOrderFail implements Action {
  readonly type = SAVE_ORDER_FAIL;
  constructor(public payload: string) {
    // console.log('in actions get customer payload= ',payload);
  }
}

export type All =
      InitOrder
    | InitOrderSuccess

    | EditOrderRemoval
    | EditOrderRecipient

    | EditOrderRemovalInfos
    | EditOrderRecipientInfos

    | EditOrderOption

    | SaveOrder
    | SaveOrderSuccess
    | SaveOrderFail;
