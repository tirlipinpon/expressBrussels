import {Action} from '@ngrx/store';
import {ContactState} from '../models/contact';

export const GET_CONTACT = 'Get CONTACT';
export class GetContact implements Action {
  readonly type = GET_CONTACT;
  constructor() {
     console.log('in actions:' , this.type);
  }
}

export const GET_CONTACT_SUCCESS = 'Get CONTACT Success';
export class GetContactSuccess implements Action {
  readonly type = GET_CONTACT_SUCCESS;
  constructor(public payload: ContactState) {
    console.log('in actions:' , this.type + ' payload:', this.payload);  }
}

export const GET_CONTACT_FAIL = 'Get CONTACT Fail';
export class GetContactFail implements Action {
  readonly type = GET_CONTACT_FAIL;
  constructor(public payload: string) {
    console.log('in actions:' , this.type + ' payload:', this.payload);
  }
}

export type All =
  GetContact
    | GetContactSuccess
    | GetContactFail;
