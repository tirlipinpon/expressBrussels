import { Action } from '@ngrx/store';
import {DataForm} from "../models/DataForm";


export const VALID_CUSTOMER = 'Valid Customer';
export class ValidCustomer implements Action {
  readonly type = VALID_CUSTOMER;
  constructor(public payload: DataForm) {}
}

//===================================================

export const GET_CUSTOMER = 'Get Customer';
export class GetCustomer implements Action {
  readonly type = GET_CUSTOMER;
  constructor() {}
}

//===================================================

export const EDIT_CUSTOMER = 'Edit Customer';
export class EditCustomer implements Action {
  readonly type = EDIT_CUSTOMER;
  constructor(public payload: DataForm) {}
}

//===================================================

export const EDIT_REMOVAL = 'Edit Removal';
export class EditRemoval implements Action {
  readonly type = EDIT_REMOVAL;
  constructor(public payload: DataForm[]) {}
}

//===================================================

export const EDIT_RECIPIENT = 'Edit Recipient';
export class EditRecipient implements Action {
  readonly type = EDIT_RECIPIENT;
  constructor(public payload: DataForm[]) {}
}

//===========================================

export type All =  GetCustomer
    | EditCustomer
    | EditRemoval
    | EditRecipient
    | ValidCustomer;
