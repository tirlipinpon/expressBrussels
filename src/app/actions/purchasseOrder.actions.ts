import { Action } from '@ngrx/store';
import {PurchasseOrder} from '../models/PurchasseOrder';
import {Distance} from "../models/distance";

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
// ===================== removal ==============================
export const EDIT_ORDER_REMOVAL = 'Edit Order Removal';
export class EditOrderRemoval implements Action {
  readonly type = EDIT_ORDER_REMOVAL;
  constructor(public payload: number) {
    // console.log('in actions get customer payload= ',payload);
  }
}
// ==================== recipient ===============================
export const EDIT_ORDER_RECIPIENT = 'Edit Order Recipient';
export class EditOrderRecipient implements Action {
  readonly type = EDIT_ORDER_RECIPIENT;
  constructor(public payload: string[]) {
    // console.log('in actions get customer payload= ',payload);
  }
}
// ==================== recipient cascades ===============================
export const EDIT_ORDER_RECIPIENT_CASCADES = 'Edit Order Recipient cascades';
export class EditOrderRecipientCascades implements Action {
  readonly type = EDIT_ORDER_RECIPIENT_CASCADES;
  constructor(public payload: string[]) {
    // console.log('in actions get customer payload= ',payload);
  }
}
// ==================== removal infos ===============================
export const EDIT_ORDER_REMOVAL_INFOS = 'Edit Order Removal Infos';
export class EditOrderRemovalInfos implements Action {
  readonly type = EDIT_ORDER_REMOVAL_INFOS;
  constructor(public payload: any) {
    // console.log('in actions get customer payload= ',payload);
  }
}
// ==================== recipient infos ===============================
export const EDIT_ORDER_RECIPIENT_INFOS = 'Edit Order Recipient Infos';
export class EditOrderRecipientInfos implements Action {
  readonly type = EDIT_ORDER_RECIPIENT_INFOS;
  constructor(public payload: any) {
    // console.log('in actions get recipients infos  payload= ',payload);
  }
}
// ==================== recipient infos cascades ===============================
export const EDIT_ORDER_RECIPIENT_INFOS_CASCADES = 'Edit Order Recipient Infos Cascades';
export class EditOrderRecipientInfosCascades implements Action {
  readonly type = EDIT_ORDER_RECIPIENT_INFOS_CASCADES;
  constructor(public payload: Array<string>) {
    // console.log('in actions get recipients infos cascades  payload= ',payload);
  }
}
// =================== options ================================
export const EDIT_ORDER_OPTION = 'Edit Order option';
export class EditOrderOption implements Action {
  readonly type = EDIT_ORDER_OPTION;
  constructor(public payload: PurchasseOrder) {
    // console.log('in actions get customer payload= ',payload);
  }
}
// ================= save order ==================================
export const SAVE_ORDER = 'Save Order';
export class SaveOrder implements Action {
  readonly type = SAVE_ORDER;
}

export const SAVE_ORDER_SUCCESS = 'Save Order Success';
export class SaveOrderSuccess implements Action {
  readonly type = SAVE_ORDER_SUCCESS;
  constructor(public payload?: any) {
     console.log('in actions save Order  payload= ',payload);
  }
}

export const SAVE_ORDER_FAIL = 'Save Order Fail';
export class SaveOrderFail implements Action {
  readonly type = SAVE_ORDER_FAIL;
  constructor(public payload: string) {
     console.log('in actions save order fail payload= ',payload);
  }
}
// =================== distance ================================
export const EDIT_ORDER_DISTANCE = 'Edit Order Distance';
export class EditOrderDistance implements Action {
  readonly type = EDIT_ORDER_DISTANCE;
  constructor(public payload: Distance) {
    console.log('in actions edit order distnace payload= ',payload);
  }
}


// =================== client zone ===========================================
export const GET_CLIENT_ZONE = 'Get client Zone';
export class GetClientZone implements Action {
  readonly type = GET_CLIENT_ZONE;
  constructor(public payload: number) {
    console.log('in actions get client zone:', payload);
  }
}

export const GET_CLIENT_ZONE_SUCCESS = 'Get client Zone Success';
export class GetClientZoneSuccess implements Action {
  readonly type = GET_CLIENT_ZONE_SUCCESS;
  constructor(public payload: number) {
    console.log('in actions get client zone success payload= ',payload);
  }
}

export const GET_CLIENT_ZONE_FAIL = 'Get client Zone Fail';
export class GetClientZoneFail implements Action {
  readonly type = GET_CLIENT_ZONE_FAIL;
  constructor(public payload: string) {
    console.log('in actions get client zone fail payload= ',payload);
  }
}

export type All =
      InitOrder
    | InitOrderSuccess

    | EditOrderRemoval
    | EditOrderRecipient

    | EditOrderRecipientCascades

    | EditOrderRemovalInfos
    | EditOrderRecipientInfos

    | EditOrderRecipientInfosCascades

    | EditOrderOption
    | EditOrderDistance

    | SaveOrder
    | SaveOrderSuccess
    | SaveOrderFail

    | GetClientZone
    | GetClientZoneSuccess
    | GetClientZoneFail;
