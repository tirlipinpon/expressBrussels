import * as CustomerActions  from '../actions/customer.actions';
import * as RemovalActions  from '../actions/removal.actions';
import * as RecipientActions  from '../actions/recipient.actions';
import * as PurchasseOrderActions  from '../actions/purchasseOrder.actions';
import * as OrdersActions from '../actions/orders.actions';
import * as IEOrdersAction from '../actions/orders-ie.actions';
import * as ClientZonesActions from '../actions/clientZones.actions';
import * as PrixZoneMotoActions from '../actions/prixZoneMoto.actions';
import * as PrixZoneCamionnetteActions from '../actions/prixZoneCamionnette.actions';
import * as ContactActions from '../actions/contact.actions';
import * as ToasterActions from '../actions/toaster.actions';
import * as _ from 'lodash';
import {DataForm, DataDataFormState} from '../models/DataForm';
import {PurchasseOrder} from '../models/PurchasseOrder';
import {MyClientZonesState} from '../models/my-client-zones';
import {MyPrixZoneState} from "../models/prixZone";
import {ContactState} from "../models/contact";
import {AddRemovalSuccess, DeleteRemovalSuccess, EditRemovalSuccess} from "../actions/removal.actions";
import {AddRecipientSuccess, DeleteRecipientSuccess, EditRecipientSuccess} from "../actions/recipient.actions";
import {ToasterState} from "../models/toaster";
import { ImportExport } from '../models/import-export';

export type ActionCustomer = CustomerActions.All;
export type ActionRemoval = RemovalActions.All;
export type ActionRecipient = RecipientActions.All;
export type ActionPurchasseOrder = PurchasseOrderActions.All;
export type ActionOrders = OrdersActions.All;
export type ActionIeOrders = IEOrdersAction.All;
export type ActionClientZones = ClientZonesActions.All;
export type ActionPrixZoneMoto = PrixZoneMotoActions.All;
export type ActionPrixZoneCamionnette = PrixZoneCamionnetteActions.All;
export type ActionContact = ContactActions.All;
export type ActionToaster = ToasterActions.All;

// ======================================================
// customer reducer
// ======================================================
const initCustomer: DataForm = {
  id: 0,
  name: '',
  ref_client: '',
  address: '',
  number: '',
  cp: 0,
  state: '',
  addressValidated: false,
  clientZone: 0,
  phone: '',
  infos: {
    info1: '',
    info2: ''
  },
  type: 0,
  fk_client: 0,
  active:  0,
  created: '',
  fk_type: 0
};
export function customerReducer(state = initCustomer , action: ActionCustomer): DataForm {
  switch (action.type) {
    case CustomerActions.SET_CUSTOMER:
      if (state.id===0 || !state.id) {
        return {...state, ...action.payload};
      }
    case CustomerActions.GET_CUSTOMER_SUCCESS:
      return {...state, ...action.payload};
    case CustomerActions.EDIT_CUSTOMER:
      return {...state, ...action.payload};
    // case CustomerActions.VALID_CUSTOMER:
    //   return state;
    default:
      return state;
  }
}
export const CustomerSelector = {
  customer: (state: DataForm) => { return state; },
  customerId: (state: DataForm) => { return state.id; }
};

// ======================================================
// removal reducer
// ======================================================
const initRemoval: DataDataFormState = {
  data: [],
  count: 0
};
export function removalReducer(state = initRemoval, action: any): DataDataFormState {
  // console.log('2 - Reducer customer :', action.type, state);
  switch (action.type) {
    case RemovalActions.GET_REMOVALS_SUCCESS:
      return Object.assign({}, state, action.payload ); //{...state, ...action.payload};
    case RemovalActions.EDIT_REMOVAL_SUCCESS:
      return handleEditRemovalState(state, action);
    // case RemovalActions.ADD_REMOVAL_SUCCESS:
    //   return handleRemovalState(state, action);
    case RemovalActions.GET_LAST_REMOVAL_SUCCESS:
      return handleAddRemovalState(state, action);
    case RemovalActions.DELETE_REMOVAL_SUCCESS:
      return handleDeleteRemovalState(state, action);
    case RemovalActions.RESET_REMOVALS:
      return initRemoval;
    default:
      return state;
  }
}
function handleAddRemovalState(state: DataDataFormState, action: AddRemovalSuccess): any {
  const data =  [...state.data, ...[action.payload]];
  const newState = {
    data: data,
    count: ++state.count
  };
  return newState;
}
function handleEditRemovalState(state: DataDataFormState, action: EditRemovalSuccess): any {
  const data =  state.data.map(item => {
    if (item.id == action.payload['id']) {
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
function handleDeleteRemovalState(state: DataDataFormState, action: DeleteRemovalSuccess): any {
  const newState = _.clone(state);
  const paylaod = action.payload;
  const newState2 = newState.data.map(data => {
    if (data.id === paylaod.id) {
      return action.payload;
    }
    return data;
  });
  return {...state, ...newState2};
}
export const RemovalSelectors = {
  data: (state: DataDataFormState) => { return state.data },
  count: (state: DataDataFormState) => { return state.count }
};


// ======================================================
// recipient reducer
// ======================================================
const initRecipient: DataDataFormState = {
  data: [],
  count: 0
};
export function recipientReducer(state = initRecipient, action: any): DataDataFormState {
  // console.log('2 - Reducer customer :', action.type, state);
  switch (action.type) {
    case RecipientActions.GET_RECIPIENTS_SUCCESS:
      return {...state, ...action.payload};
    case RecipientActions.EDIT_RECIPIENT_SUCCESS:
      return handleEditRecipientState(state, action);
    case RecipientActions.GET_LAST_RECIPIENT_SUCCESS:
      return handleAddRecipientState(state, action);
    case RecipientActions.DELETE_RECIPIENT_SUCCESS:
      return handleDeleteRecipientState(state, action);

    default:
      return state;
  }
}
function handleAddRecipientState(state: DataDataFormState, action: AddRecipientSuccess): any {
  const data =  [...state.data, ...[action.payload]];
  const newState = {
    data: data,
    count: ++state.count
  };
  return newState;
}
function handleEditRecipientState(state: DataDataFormState, action: EditRecipientSuccess): any {
  const data =  state.data.map(item => {
    if (item.id == action.payload['id']) {
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
function handleDeleteRecipientState(state: DataDataFormState, action: DeleteRecipientSuccess): any {
  const newState = _.clone(state);
  const newState2 =  newState.data.map(data => {
    if (data.id === action.payload.id) {
      return action.payload;
    }
    return data;
  });
  return {...state, ...newState2};
}
export const RecipientSelectors = {
  data: (state: DataDataFormState) => { return state.data },
  count: (state: DataDataFormState) => { return state.count }
};

// ======================================================
// purchasse order reducer
// ======================================================
const orderInitOrder: PurchasseOrder =  {
    id: 0,
    fk_customer_id: 0,
    fk_removal_id: 0,
    fk_recipient_id: 0,

    contact_removal: '',
    message_removal: '',

    contact_recipient: '',
    message_recipient: '',

    created: null,

    price: 0,
    distance: 0,
    elapse_time: 0,
    status: '',

    options: 'express',
    tomorrow: false,
    transport: 'moto',
    cascades: false
  };
export function purchasseOrderReducer(state: PurchasseOrder = orderInitOrder, action: ActionPurchasseOrder): PurchasseOrder {
  // console.log('2 - Reducer order :', action.type, state);
  switch (action.type) {
    case PurchasseOrderActions.INIT_ORDER_SUCCESS:
      console.log('in order reducer init payload = ', state);
      return {...state, ...orderInitOrder};

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

    case PurchasseOrderActions.EDIT_ORDER_DISTANCE:
      return Object.assign({}, state, {
        price: action.payload['price'],
        distance: action.payload['distance'],
        elapse_time: action.payload['elapse_time'],
        status: action.payload['status'],
      });
      // return state;

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
        tomorrow: action.payload.tomorrow,
        transport: action.payload.transport
      });

    case PurchasseOrderActions.SAVE_ORDER_SUCCESS:
      // console.log('in order reducer saveOrder payload = ', action.payload);
      return Object.assign({}, orderInitOrder);

    default:
      return state;
  }
}
export const PurchasseOrderSelector = {
  order: (state: PurchasseOrder) => { return state; }
};

// ======================================================
// orders reducer
// ======================================================
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

// ======================================================
// ieorders reducer
// ======================================================
export function ieOrdersReducer(state: ImportExport[], action: ActionIeOrders): ImportExport[] {
  switch (action.type) {
    case IEOrdersAction.ActionTypes.GET_SUCCESS: {
      return Object.assign({}, state, action.payload);
    }
    default: {
      return state;
    }
  }
}
export const ieOrderSelector = {
  ieorders: (state: ImportExport[]) => { return state; }
};

// ======================================================
// client zones
// ======================================================
const clientZoneInit: MyClientZonesState =  {
    data: [],
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

// ======================================================
// prix zone moto
// ======================================================
const prixZoneMotoInit: MyPrixZoneState = {
  data: {
    id: 0,
    zone1: 0,
    zone2: 0,
    zone3: 0,
    prixKm: 0,
    after15h: 0,
    double_express: 0,
    go_and_back: 0
  },
};
export function prixZoneMotoReducer(state = prixZoneMotoInit, action: ActionPrixZoneMoto): MyPrixZoneState {
  switch(action.type){
    case PrixZoneMotoActions.GET_PRIX_ZONE_MOTO_SUCCESS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
export const PrixZoneMotoSelector = {
  data: (state: MyPrixZoneState) => { return state.data }
};

// ======================================================
// prix zone camionnette
// ======================================================
const prixZoneCamionnetteInit: MyPrixZoneState = {
  data: {
    id: 0,
    zone1: 0,
    zone2: 0,
    zone3: 0,
    prixKm: 0,
    after15h: 0,
    double_express: 0,
    go_and_back: 0
  },
};
export function prixZoneCamionnetteReducer(state = prixZoneCamionnetteInit, action: ActionPrixZoneCamionnette): MyPrixZoneState {
  switch(action.type){
    case PrixZoneCamionnetteActions.GET_PRIX_ZONE_CAMIONNETTE_SUCCESS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};
export const PrixZoneCamionnetteSelector = {
  data: (state: MyPrixZoneState) => { return state.data }
};

// ======================================================
// contact
// ======================================================
const contactInit: ContactState = {
  data: [],
  count: 0
};
export function contactReducer(state = contactInit, action: ActionContact): ContactState {
  switch(action.type){
    case ContactActions.GET_CONTACT_SUCCESS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};
export const ContactSelector = {
  data: (state: ContactState) => { return state.data },
  count: (state: ContactState) => { return state.count }
};


// ======================================================
// toaster
// ======================================================
const toasterInit: ToasterState = {
  data: [],
  count: 0
};
export function toasterReducer(state = toasterInit, action: ActionToaster): ToasterState {
  switch(action.type){
    case ToasterActions.SET_TOASTER:
     return handleAddToaster(state, action);
    default:
      return state;
  }

};

export function handleAddToaster(state: ToasterState, action: ActionToaster): ToasterState {
  const newState = Object.assign({}, state, {
    data: [action.payload]
  });
  return newState;
}

export const ToasterSelector = {
  data: (state: ToasterState) => { return state.data },
  count: (state: ToasterState) => { return state.count }
};
