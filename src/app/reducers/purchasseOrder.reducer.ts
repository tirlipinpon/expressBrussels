import * as AllActions  from '../actions/purchasseOrder.actions';
import {DataForm} from "../models/DataForm";

export type Action = AllActions.All;

export const dataformInitCustomer: DataForm =  {
  id: 0,
  name: '',
  address: '',
  number: '',
  cp: 0,
  state: '',
  phone: '',
  info1: '',
  info2: '',
  typeForm: 0,
  fk_client: '',
  active: false,
};
export const dataformInitRemoval: DataForm[] =  [{
  id: 0,
  name: '',
  address: '',
  number: '',
  cp: 0,
  state: '',
  phone: '',
  info1: '',
  info2: '',
  typeForm: 1,
  fk_client: '',
  active: false,
}];
export const dataformInitRecipient: DataForm[] =  [{
  id: 0,
  name: '',
  address: '',
  number: '',
  cp: 0,
  state: '',
  phone: '',
  info1: '',
  info2: '',
  typeForm: 1,
  fk_client: '',
  active: false,
}];

export function customerReducer(state: DataForm = dataformInitCustomer, action: Action) {
  // console.log('2 - Reducer customer :', action.type, state);
  switch (action.type) {
    case AllActions.GET_CUSTOMER:
      return Object.assign({}, state, action);
    case AllActions.EDIT_CUSTOMER:
      return {...state, ...action.payload}; //Object.assign({}, state, action.payload );
    case AllActions.VALID_CUSTOMER:
      return state;
    default:
      return state;
  }
}

export function removalReducer(state: DataForm[] = dataformInitRemoval, action: Action) {
  // console.log('- Reducer removal :', action.type, state);
  switch (action.type) {
    case AllActions.EDIT_REMOVAL:
      // return Object.assign({},state, action.payload );
      return Object.assign({}, state, action.payload );
    default:
      return state;
  }
}

export function recipientReducer(state: DataForm[] = dataformInitRecipient, action: Action) {
  // console.log('- Reducer recipient :', action.type, state);
  switch (action.type) {
    case AllActions.EDIT_RECIPIENT:
      // return Object.assign({},state, action.payload );
      return Object.assign({}, state, action.payload );
    default:
      return state;
  }
}
