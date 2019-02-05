import {Action} from '@ngrx/store';
import {ContactState, Contact} from '../models/contact';

export const GET_CONTACT = 'Get CONTACT';
export class GetContact implements Action {
  readonly type = GET_CONTACT;
  constructor() {
     // console.log('in actions:' , this.type);
  }
}

export const GET_CONTACT_SUCCESS = 'Get CONTACT Success';
export class GetContactSuccess implements Action {
  readonly type = GET_CONTACT_SUCCESS;
  constructor(public payload: ContactState) {
    // console.log('in actions:' , this.type + ' payload:', this.payload);
  }
}

export const GET_CONTACT_FAIL = 'Get CONTACT Fail';
export class GetContactFail implements Action {
  readonly type = GET_CONTACT_FAIL;
  constructor(public payload: string) {
    console.log('in actions:' , this.type + ' payload:', this.payload);
  }
}


export const ADD_CONTACTS = 'Add CONTACTS';
export class AddContacts implements Action {
  readonly type = ADD_CONTACTS;
  constructor(public payload?: any) {
    console.log('in actions:' , this.type + ' payload:', this.payload);
  }
}

export const ADD_CONTACT_SUCCESS = 'Add CONTACT Success';
export class AddContactSuccess implements Action {
  readonly type = ADD_CONTACT_SUCCESS;
  constructor(public payload?: any) {
    // console.log('in actions:' , this.type + ' payload:', this.payload);
  }
}

export const ADD_CONTACT_FAIL = 'Add CONTACT Fail';
export class AddContactFail implements Action {
  readonly type = ADD_CONTACT_FAIL;
  constructor(public payload?: any) {
    // console.log('in actions:' , this.type + ' payload:', this.payload);
  }
}

export type All =
  GetContact
    | GetContactSuccess
    | GetContactFail
    | AddContacts
    | AddContactSuccess
    | AddContactFail;
