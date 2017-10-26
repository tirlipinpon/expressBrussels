import { Action } from '@ngrx/store';
import {DataForm} from "../models/DataForm";


export const GET_RECIPIENTS = 'Get Recipients';
export class GetRecipients implements Action {
  readonly type = GET_RECIPIENTS;
  constructor(public payload: number) {
    // console.log('in actions get Recipients payload= ',payload);
  }
}

export const GET_RECIPIENTS_SUCCESS = 'Get Recipients Success';
export class GetRecipientsSuccess implements Action {
  readonly type = GET_RECIPIENTS_SUCCESS;
  constructor(public payload: DataForm[]) {
    // console.log('in actions get Recipients payload= ',payload);
  }
}

export const GET_RECIPIENTS_FAIL = 'Get Recipients Fail';
export class GetRecipientsFail implements Action {
  readonly type = GET_RECIPIENTS_FAIL;
  constructor(public payload: string) {
    // console.log('in actions get Recipients payload= ',payload);
  }
}

//===================================================

export const EDIT_RECIPIENT = 'Edit Recipient';
export class EditRecipient implements Action {
  readonly type = EDIT_RECIPIENT;
  constructor(public payload: DataForm) {
    // console.log('in actions edit Recipient payload= ',payload);
  }
}

export const EDIT_RECIPIENT_SUCCESS = 'Edit Recipient Success';
export class EditRecipientSuccess implements Action {
  readonly type = EDIT_RECIPIENT_SUCCESS;
  constructor(public payload: DataForm) {
    // console.log('in actions get Recipient payload= ',payload);
  }
}

export const EDIT_RECIPIENT_FAIL = 'Edit Recipient Fail';
export class EditRecipientFail implements Action {
  readonly type = EDIT_RECIPIENT_FAIL;
  constructor(public payload: string) {
    // console.log('in actions get Recipient payload= ',payload);
  }
}

export type All =
  GetRecipients
    | GetRecipientsSuccess
    | GetRecipientsFail

    | EditRecipient
    | EditRecipientSuccess
    | EditRecipientFail;
