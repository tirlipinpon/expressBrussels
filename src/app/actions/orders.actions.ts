import { Action } from '@ngrx/store';
import {PurchasseOrder} from '../models/PurchasseOrder';

export const RESET_ORDERS = 'Reset Orders';
export class ResetOrders implements Action {
  readonly type = RESET_ORDERS;
  constructor() {
    // console.log('in actions get orders by fk_customer_id payload= ',payload);
  }
}

export const GET_ORDERS = 'Get Orders';
export class GetOrders implements Action {
  readonly type = GET_ORDERS;
  constructor(public payload: number) {
    // console.log('in actions get orders by fk_customer_id payload= ',payload);
  }
}

export const GET_ORDERS_SUCCESS = 'Get Orders Success';
export class GetOrdersSuccess implements Action {
  readonly type = GET_ORDERS_SUCCESS;
  constructor(public payload: PurchasseOrder[]) {
    // console.log('in actions get orders sucess payload= ',payload);
  }
}

export const GET_ORDERS_FAIL = 'Get Orders Fail';
export class GetOrdersFail implements Action {
  readonly type = GET_ORDERS_FAIL;
  constructor(public payload: string) {
     // console.log('in actions get orders fail payload= ',payload);
  }
}

export type All =
  ResetOrders
  | GetOrders
  | GetOrdersSuccess
  | GetOrdersFail;
