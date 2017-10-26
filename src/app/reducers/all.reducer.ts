import * as CustomerActions  from '../actions/customer.actions';
import * as RemovalActions  from '../actions/removal.actions';
import * as RecipientActions  from '../actions/recipient.actions';
import {DataForm} from "../models/DataForm";

export type ActionCustomer = CustomerActions.All;
export type ActionRemoval = RemovalActions.All;
export type ActionRecipient = RecipientActions.All;

export const dataformInitRemoval: DataForm[] =  [
    {
      id: 1,
      name: 'a',
      address: '',
      number: '',
      cp: 0,
      state: '',
      phone: '',
      info1: '',
      info2: '',
      type: 1,
      fk_client: 0,
      active: true,
      created: new Date,
      fk_type: 12
    },
    {
      id: 2,
      name: 'b',
      address: '',
      number: '',
      cp: 0,
      state: '',
      phone: '',
      info1: '',
      info2: '',
      type: 1,
      fk_client: 0,
      active: true,
      created: new Date,
      fk_type: 12
    }
  ];
const initialStateRecupients: DataForm[] =  dataformInitRemoval;

export function customerReducer(state: DataForm, action: ActionCustomer): DataForm {
  // console.log('2 - Reducer customer :', action.type, state);
  switch (action.type) {
    case CustomerActions.GET_CUSTOMER_SUCCESS:
      //console.log('in customer reducer getCustomer payload = ',action.payload);
      return {...state, ...action.payload};
    case CustomerActions.EDIT_CUSTOMER_SUCCESS:
      // console.log('in customer reducer editCustomer payload = ',action.payload);
      return {...state, ...action.payload}; //Object.assign({}, state, action.payload );
    // case CustomerActions.VALID_CUSTOMER:
    //   return state;
    default:
      return state;
  }
}

export function removalReducer(state: DataForm[], action: ActionRemoval): DataForm[] {
  // console.log('2 - Reducer customer :', action.type, state);
  switch (action.type) {
    case RemovalActions.GET_REMOVALS_SUCCESS:
      console.log('in removal reducer getRemoval payload = ',action.payload);
      return {...state, ...action.payload};
    case RemovalActions.EDIT_REMOVAL_SUCCESS:
      // console.log('in customer reducer editCustomer payload = ',action.payload);
      return {...state, ...action.payload}; //Object.assign({}, state, action.payload );
    // case CustomerActions.VALID_CUSTOMER:
    //   return state;
    default:
      return state;
  }
}


export function recipientReducer(state: DataForm[], action: ActionRecipient): DataForm[] {
  // console.log('2 - Reducer customer :', action.type, state);
  switch (action.type) {
    case RecipientActions.GET_RECIPIENTS_SUCCESS:
      console.log('in removal reducer getRemoval payload = ',action.payload);
      return {...state, ...action.payload};
    case RecipientActions.EDIT_RECIPIENT_SUCCESS:
      // console.log('in customer reducer editCustomer payload = ',action.payload);
      return {...state, ...action.payload}; //Object.assign({}, state, action.payload );
    // case CustomerActions.VALID_CUSTOMER:
    //   return state;
    default:
      return state;
  }
}
