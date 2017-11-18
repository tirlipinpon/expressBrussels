import * as CustomerActions  from '../actions/customer.actions';
import * as RemovalActions  from '../actions/removal.actions';
import * as RecipientActions  from '../actions/recipient.actions';
import * as PurchasseOrderActions  from '../actions/purchasseOrder.actions';
import * as OrdersActions from '../actions/orders.actions';

import {DataForm} from "../models/DataForm";
import {PurchasseOrder} from "../models/PurchasseOrder";

export type ActionCustomer = CustomerActions.All;
export type ActionRemoval = RemovalActions.All;
export type ActionRecipient = RecipientActions.All;
export type ActionPurchasseOrder = PurchasseOrderActions.All;
export type ActionOrders = OrdersActions.All;

const orderInitOrder: PurchasseOrder =
    {
      id: 0,
      fk_customer_id: 0,
      fk_removal_id: 0,
      fk_recipient_id: 0,

      contact_removal: '',
      message_removal: '',

      contact_recipient: '',
      message_recipient: '',

      date: new Date(),
      price: 0,
      options: 'express',
      tomorrow: false
    };


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
      return Object.assign({}, state, action.payload ); //{...state, ...action.payload};
    case RemovalActions.EDIT_REMOVAL_SUCCESS:
      // console.log('in customer reducer editCustomer payload = ',action.payload);
      return Object.assign({}, state, action.payload ); // {...state, ...action.payload};
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
      return Object.assign({}, state, action.payload ); //{...state, ...action.payload}; //
    // case CustomerActions.VALID_CUSTOMER:
    //   return state;
    default:
      return state;
  }
}

export function purchasseOrderReducer(state: PurchasseOrder = orderInitOrder, action: ActionPurchasseOrder): PurchasseOrder {
  // console.log('2 - Reducer order :', action.type, state);
  switch (action.type) {
    // case PurchasseOrderActions.INIT_ORDER_SUCCESS:
    //   console.log('in order reducer init payload = ', state);
    //   return {...state, ...orderInitOrder};

    case PurchasseOrderActions.EDIT_ORDER_OPTION_SUCCESS:
      console.log('in order reducer edit Order option payload = ',action.payload);
      return Object.assign({}, state, {
        options: action.payload.options,
        tomorrow: action.payload.tomorrow
      });

    case PurchasseOrderActions.EDIT_ORDER_REMOVAL_SUCCESS:
      console.log('in order reducer edit Order removal payload = ',action.payload);
      return Object.assign({}, state, {
        fk_removal_id: action.payload,
      });

    case PurchasseOrderActions.EDIT_ORDER_RECIPIENT_SUCCESS:
      console.log('in order reducer edit Order Recipient payload = ',action.payload);
      return Object.assign({}, state, {
        fk_recipient_id: action.payload,
      });

    case PurchasseOrderActions.EDIT_ORDER_REMOVAL_INFOS_SUCCESS:
      console.log('in order reducer edit Order Removal Infos payload = ',action.payload);
      return Object.assign({}, state, {
        contact_removal: action.payload.info1,
        message_removal: action.payload.info2,
      });

    case PurchasseOrderActions.EDIT_ORDER_RECIPIENT_INFOS_SUCCESS:
      console.log('in order reducer edit Order Recipient Infos payload = ',action.payload);
      return Object.assign({}, state, {
        contact_recipient: action.payload.info1,
        message_recipient: action.payload.info2,
      });

    case PurchasseOrderActions.SAVE_ORDER_SUCCESS:
      console.log('in order reducer saveOrder payload = ', action.payload);
      return state;

    default:
      return state;
  }

}

export function ordersReducer(state: PurchasseOrder[], action: ActionOrders): PurchasseOrder[] {
  switch(action.type){
    case OrdersActions.GET_ORDERS_SUCCESS:
      // console.log('in orders reducer get orders by fk_customer_id',action.payload);
      return Object.assign({}, state, action.payload);
      // return [...state, ...action.payload];
    default:
      return state;
  }
}
