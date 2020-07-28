import { Action } from '@ngrx/store';
import {DataForm, DataDataFormState} from '../models/DataForm';

export const RESET_RECIPIENTS = 'Reset Recipients';
export class ResetRecipients implements Action {
  readonly type = RESET_RECIPIENTS;
  constructor() {
    // console.log('in actions get Recipients payload= ',payload);
  }
}

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
  constructor(public payload: DataDataFormState) {
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
// ===================================================

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

// ===================================================
export const ADD_RECIPIENT = 'Add Recipient';
export class AddRecipient implements Action {
  readonly type = ADD_RECIPIENT;
  constructor(public payload: DataForm) {
    console.log('in actions add Recipient payload= ',payload);
  }
}

export const ADD_RECIPIENT_SUCCESS = 'Add Recipient Success';
export class AddRecipientSuccess implements Action {
  readonly type = ADD_RECIPIENT_SUCCESS;
  constructor(public payload: number) {
    console.log('in actions add Recipient success payload= ',payload);
  }
}

export const ADD_RECIPIENT_FAIL = 'Add Recipient Fail';
export class AddRecipientFail implements Action {
  readonly type = ADD_RECIPIENT_FAIL;
  constructor(public payload: string) {
    console.log('in actions add Recipient payload= ',payload);
  }
}

// ===================================================
export const GET_LAST_RECIPIENT = 'Get last Recipient';
export class GetLastRecipient implements Action {
  readonly type = GET_LAST_RECIPIENT;
  constructor(public payload: DataForm) {
    // console.log('in actions get Recipient payload= ',payload);
  }
}

export const GET_LAST_RECIPIENT_SUCCESS = 'Get Last Recipient Success';
export class GetLastRecipientSuccess implements Action {
  readonly type = GET_LAST_RECIPIENT_SUCCESS;
  constructor(public payload?: DataForm) {
    // console.log('in actions get last Recipient success payload= ',payload);
  }
}

export const GET_LAST_RECIPIENT_FAIL = 'Get Last Recipient Fail';
export class GetLastRecipientFail implements Action {
  readonly type = GET_LAST_RECIPIENT_FAIL;
  constructor(public payload: string) {
    // console.log('in actions get Recipient payload= ',payload);
  }
}

// ===================================================
export const DELETE_RECIPIENT = 'DELETE  Recipient';
export class DeleteRecipient implements Action {
  readonly type = DELETE_RECIPIENT;
  constructor(public payload: DataForm) {
    // console.log('in actions get removal payload= ',payload);
  }
}

export const DELETE_RECIPIENT_SUCCESS = 'DELETE Recipient Success';
export class DeleteRecipientSuccess implements Action {
  readonly type = DELETE_RECIPIENT_SUCCESS;
  constructor(public payload: DataForm) {
    // console.log('in actions get last removal success payload= ',payload);
  }
}

export const DELETE_RECIPIENT_FAIL = 'DELETE Recipient Fail';
export class DeleteRecipientFail implements Action {
  readonly type = DELETE_RECIPIENT_FAIL;
  constructor(public payload: string) {
    // console.log('in actions get customer payload= ',payload);
  }
}


export type All =
  ResetRecipients
    | GetRecipients
    | GetRecipientsSuccess
    | GetRecipientsFail

    | EditRecipient
    | EditRecipientSuccess
    | EditRecipientFail

    | AddRecipient
    | AddRecipientSuccess
    | AddRecipientFail

    | GetLastRecipient
    | GetLastRecipientSuccess
    | GetLastRecipientFail

    | DeleteRecipient
    | DeleteRecipientSuccess
    | DeleteRecipientFail;
