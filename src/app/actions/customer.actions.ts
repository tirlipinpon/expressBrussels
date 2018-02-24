import { Action } from '@ngrx/store';
import {DataForm} from '../models/DataForm';

export const GET_CUSTOMER = 'Get Customer';
export class GetCustomer implements Action {
  readonly type = GET_CUSTOMER;
  constructor(public payload: number) {
    // console.log('in actions get customer payload= ',payload);
  }
}

export const GET_CUSTOMER_SUCCESS = 'Get Customer Success';
export class GetCustomerSuccess implements Action {
  readonly type = GET_CUSTOMER_SUCCESS;
  constructor(public payload: DataForm) {
    // console.log('in actions get customer success payload= ',payload);
  }
}

export const GET_CUSTOMER_FAIL = 'Get Customer Fail';
export class GetCustomerFail implements Action {
  readonly type = GET_CUSTOMER_FAIL;
  constructor(public payload: string) {
    // console.log('in actions get customer payload= ',payload);
  }
}
//===================================================
export const EDIT_CUSTOMER = 'Edit Customer';
export class EditCustomer implements Action {
  readonly type = EDIT_CUSTOMER;
  constructor(public payload: DataForm) {
     // console.log('in actions edit customer payload= ',payload);
  }
}
//===================================================
export const SAVE_CUSTOMER = 'Save Customer';
export class SaveCustomer implements Action {
  readonly type = SAVE_CUSTOMER;
}

export const SAVE_CUSTOMER_SUCCESS = 'SAVE Customer Success';
export class SaveCustomerSuccess implements Action {
  readonly type = SAVE_CUSTOMER_SUCCESS;
  constructor(public payload: string) {
    // console.log('in actions get customer payload= ',payload);
  }
}

export const SAVE_CUSTOMER_FAIL = 'SAVE Customer FAIL';
export class SaveCustomerFail implements Action {
  readonly type = SAVE_CUSTOMER_FAIL;
  constructor(public payload: string) {
    // console.log('in actions get customer payload= ',payload);
  }
}

export type All =
      GetCustomer
    | GetCustomerSuccess
    | GetCustomerFail

    | EditCustomer

    | SaveCustomer
    | SaveCustomerSuccess
    | SaveCustomerFail


