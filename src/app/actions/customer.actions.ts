import { Action } from '@ngrx/store';
import {DataForm} from "../models/DataForm";


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
    // console.log('in actions get customer payload= ',payload);
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

export const EDIT_CUSTOMER_SUCCESS = 'Edit Customer Success';
export class EditCustomerSuccess implements Action {
  readonly type = EDIT_CUSTOMER_SUCCESS;
  constructor(public payload: DataForm) {
    // console.log('in actions get customer payload= ',payload);
  }
}

export const EDIT_CUSTOMER_FAIL = 'Edit Customer Fail';
export class EditCustomerFail implements Action {
  readonly type = EDIT_CUSTOMER_FAIL;
  constructor(public payload: string) {
    // console.log('in actions get customer payload= ',payload);
  }
}

export type All =
      GetCustomer
    | GetCustomerSuccess
    | GetCustomerFail

    | EditCustomer
    | EditCustomerSuccess
    | EditCustomerFail;
