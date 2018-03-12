import * as CustomerActions  from '../actions/customer.actions';
import * as RemovalActions  from '../actions/removal.actions';
import * as RecipientActions  from '../actions/recipient.actions';
import * as PurchasseOrderActions  from '../actions/purchasseOrder.actions';
import * as OrdersActions from '../actions/orders.actions';
import * as ClientZonesActions from '../actions/clientZones.actions';

import {DataForm, DataDataFormState} from '../models/DataForm';
import {PurchasseOrder} from '../models/PurchasseOrder';
import {MyClientZones, MyClientZonesState} from "../models/my-client-zones";

export type ActionCustomer = CustomerActions.All;
export type ActionRemoval = RemovalActions.All;
export type ActionRecipient = RecipientActions.All;
export type ActionPurchasseOrder = PurchasseOrderActions.All;
export type ActionOrders = OrdersActions.All;
export type ActionClientZones = ClientZonesActions.All;

//======================================================
// customer reducer
//======================================================
export function customerReducer(state: DataForm, action: ActionCustomer): DataForm {
  // console.log('2 - Reducer customer :', action.type, state);
  switch (action.type) {
    case CustomerActions.GET_CUSTOMER_SUCCESS:
      //console.log('in customer reducer getCustomer payload = ',action.payload);
      return {...state, ...action.payload};
    case CustomerActions.EDIT_CUSTOMER:
      // console.log('in customer reducer editCustomer payload = ',action.payload);
      return {...state, ...action.payload}; //Object.assign({}, state, action.payload );
    // case CustomerActions.VALID_CUSTOMER:
    //   return state;
    default:
      return state;
  }
}
export const CustomerSelector = {
  customer: (state: DataForm) => { return state; }
};

//======================================================
// removal reducer
//======================================================
const initRemoval: DataDataFormState = {
  data: [],
  count: 0
};
export function removalReducer(state = initRemoval, action: ActionRemoval): DataDataFormState {
  // console.log('2 - Reducer customer :', action.type, state);
  switch (action.type) {
    case RemovalActions.GET_REMOVALS_SUCCESS:
      return Object.assign({}, state, action.payload ); //{...state, ...action.payload};
    case RemovalActions.EDIT_REMOVAL_SUCCESS:
      return handleRemovalState(state, action);
    // case RemovalActions.ADD_REMOVAL_SUCCESS:
    //   return handleRemovalState(state, action);
    case RemovalActions.GET_LAST_REMOVAL_SUCCESS:
      return handleAddRemovalState(state, action);
    default:
      return state;
  }
}
function handleAddRemovalState(state: DataDataFormState, action: ActionRemoval): any {
  const data =  [...state.data, ...[action.payload]];
  const newState = {
    data: data,
    count: ++state.count
  };
  return newState;
}
function handleRemovalState(state: DataDataFormState, action: ActionRemoval): any {
  const data =  state.data.map(item => {
    if(item.id == action.payload['id']) {
      return action.payload;
    }
    return item;
  });
  const newState = {
      data:  data,
      count: state.count
  };
  return newState;
}
export const RemovalSelectors = {
  data: (state: DataDataFormState) => { return state.data },
  count: (state: DataDataFormState) => { return state.count }
};

//======================================================
// recipient reducer
//======================================================
const initRecipient: DataDataFormState = {
  data: [],
  count: 0
};
export function recipientReducer(state = initRecipient, action: ActionRecipient): DataDataFormState {
  // console.log('2 - Reducer customer :', action.type, state);
  switch (action.type) {
    case RecipientActions.GET_RECIPIENTS_SUCCESS:
      // console.log('in removal reducer getRemoval payload = ',action.payload);
      return {...state, ...action.payload};
    case RecipientActions.EDIT_RECIPIENT_SUCCESS:
      // console.log('in customer reducer editCustomer payload = ',action.payload);
      return Object.assign({}, state, action.payload ); //{...state, ...action.payload}; //
    // case CustomerActions.VALID_CUSTOMER:
    //   return state;
    case RecipientActions.GET_LAST_RECIPIENT_SUCCESS:
      return handleAddRecipientState(state, action);
    default:
      return state;
  }
}
function handleAddRecipientState(state: DataDataFormState, action: ActionRecipient): any {
  const data =  [...state.data, ...[action.payload]];
  const newState = {
    data: data,
    count: ++state.count
  };
  return newState;
}
export const RecipientSelectors = {
  data: (state: DataDataFormState) => { return state.data },
  count: (state: DataDataFormState) => { return state.count }
};

//======================================================
// purchasse order reducer
//======================================================
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
    tomorrow: false,
    cascades: false
  };
export function purchasseOrderReducer(state: PurchasseOrder = orderInitOrder, action: ActionPurchasseOrder): PurchasseOrder {
  // console.log('2 - Reducer order :', action.type, state);
  switch (action.type) {
    // case PurchasseOrderActions.INIT_ORDER_SUCCESS:
    //   console.log('in order reducer init payload = ', state);
    //   return {...state, ...orderInitOrder};

    case PurchasseOrderActions.EDIT_ORDER_REMOVAL:
      // console.log('in order reducer edit Order removal payload = ',action.payload);
      return Object.assign({}, state, {
        fk_removal_id: action.payload,
        contact_removal: null,
        message_removal: null
      });

    case PurchasseOrderActions.EDIT_ORDER_RECIPIENT:
      // console.log('in order reducer edit Order Recipient payload = ',action.payload);
      return Object.assign({}, state, {
        fk_recipient_id: action.payload,
        contact_recipient: null,
        message_recipient: null
      });

    case PurchasseOrderActions.EDIT_ORDER_RECIPIENT_CASCADES:
      // console.log('in order reducer edit Order Recipient payload = ',action.payload);
      return Object.assign({}, state, {
        fk_recipient_id: JSON.stringify(action.payload),
        contact_recipient: null,
        message_recipient: null,
        cascades: 1
      });

    case PurchasseOrderActions.EDIT_ORDER_REMOVAL_INFOS:
      // console.log('in order reducer edit Order Removal Infos payload = ',action.payload);
      return Object.assign({}, state, {
        contact_removal: action.payload.info1,
        message_removal: action.payload.info2,
      });

    case PurchasseOrderActions.EDIT_ORDER_RECIPIENT_INFOS:
      // console.log('in order reducer edit Order Recipient Infos payload = ',action.payload);
      return Object.assign({}, state, {
        contact_recipient: action.payload.info1,
        message_recipient: action.payload.info2,
      });

    case PurchasseOrderActions.EDIT_ORDER_RECIPIENT_INFOS_CASCADES:
      // console.log('in order reducer edit Order Recipient Infos cascades payload = ',action.payload);
      let contact_recipient_info1: Array<string> = [];
      let contact_recipient_info2: Array<string> = [];
      action.payload.forEach( item => {
        contact_recipient_info1.push(item['info1']);
        contact_recipient_info2.push(item['info2']);
      });
      return Object.assign({}, state, {
        contact_recipient: JSON.stringify(contact_recipient_info1),
        message_recipient: JSON.stringify(contact_recipient_info2)
      });

    case PurchasseOrderActions.EDIT_ORDER_OPTION:
      // console.log('in order reducer edit Order option payload = ',action.payload);
      return Object.assign({}, state, {
        options: action.payload.options,
        tomorrow: action.payload.tomorrow
      });

    case PurchasseOrderActions.SAVE_ORDER_SUCCESS:
      // console.log('in order reducer saveOrder payload = ', action.payload);
      return state;

    default:
      return state;
  }

}
export const PurchasseOrderSelector = {
  order: (state: PurchasseOrder) => { return state; }
};

//======================================================
// orders reducer
//======================================================
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
export const OrderSelector = {
  orders: (state: PurchasseOrder[]) => { return state; }
};

//======================================================
// orders reducer
//======================================================
const clientZoneInit: MyClientZonesState =
  {  data: [],
    count: 0
  };
export function clientZonesReducer(state = clientZoneInit, action: ActionClientZones): MyClientZonesState {
  switch(action.type){
    case ClientZonesActions.GET_CLIENT_ZONES_SUCCESS:
      // console.log('in orders reducer get orders by fk_customer_id',action.payload);
      return Object.assign({}, state, action.payload);
    // return [...state, ...action.payload];
    default:
      return state;
  }
}
export const ClientZonesSelector = {
  data: (state: MyClientZonesState) => { return state.data },
  count: (state: MyClientZonesState) => { return state.count }
};
