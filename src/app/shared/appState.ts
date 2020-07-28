import {DataForm, DataDataFormState} from '../models/DataForm';
import {PurchasseOrder} from '../models/purchasseOrder';
import {createSelector, ActionReducerMap, createFeatureSelector, MemoizedSelector} from '@ngrx/store';
import {
  clientZonesReducer,
  customerReducer,
  ordersReducer,
  ieOrdersReducer,
  purchasseOrderReducer,
  prixZoneMotoReducer,
  prixZoneCamionnetteReducer,
  recipientReducer,
  removalReducer,
  contactReducer,
  CustomerSelector,
  RemovalSelectors,
  RecipientSelectors,
  PurchasseOrderSelector,
  OrderSelector,
  ClientZonesSelector,
  PrixZoneMotoSelector,
  PrixZoneCamionnetteSelector,
  ContactSelector, toasterReducer, ToasterSelector, ieOrderSelector
} from '../reducers/all.reducer';
import {MyClientZones, MyClientZonesState} from '../models/my-client-zones';
import {PrixZone, MyPrixZoneState} from "../models/prixZone";
import {ContactState, Contact} from "../models/contact";
import {ToasterState, Toaster} from "../models/toaster";
import { ImportExport } from '../models/import-export';

export interface AppState {
  customer: DataForm;
  removals: DataDataFormState;
  recipients: DataDataFormState;
  order: PurchasseOrder;
  orders: PurchasseOrder[];
  ieorders: ImportExport[];
  clientZones: MyClientZonesState;
  prixZoneMoto: MyPrixZoneState;
  prixZoneCamionnette: MyPrixZoneState;
  contact: ContactState;
  toaster: ToasterState;
}

export const reducers: ActionReducerMap<AppState> = {
  customer: customerReducer,
  removals: removalReducer,
  recipients: recipientReducer,
  order: purchasseOrderReducer,
  orders: ordersReducer,
  ieorders: ieOrdersReducer,
  clientZones: clientZonesReducer,
  prixZoneMoto: prixZoneMotoReducer,
  prixZoneCamionnette: prixZoneCamionnetteReducer,
  contact: contactReducer,
  toaster: toasterReducer
};

const getCustomerState = createFeatureSelector('customer');
const getRemovalsState = createFeatureSelector('removals');
const getRecipientsState = createFeatureSelector('recipients');
const getOrderState = createFeatureSelector('order');
const getOrdersState = createFeatureSelector('orders');
const getIeOrdersState = createFeatureSelector('ieorders');
const getClientZonesState = createFeatureSelector('clientZones');
const getPrixZoneMotoState = createFeatureSelector('prixZoneMoto');
const getPrixZoneCamionnetteState = createFeatureSelector('prixZoneCamionnette');
const contactState = createFeatureSelector('contact');
const toasterState = createFeatureSelector('toaster');

// export const rootSelectors = {
// customer: createSelector(getCustomerState, (state: AppState) => { return state.customer}),
// removals: createSelector(getRemovalsState, (state: AppState) => { return state.removals}),
// recipients: createSelector(getRecipientsState, (state: AppState) => { return state.recipients}),
// order: createSelector(getOrderState, (state: AppState) => { return state.order}),
// orders: createSelector(getOrdersState, (state: AppState) => { return state.orders}),
// };

export interface Selectors {
  getCustomer: MemoizedSelector<AppState, DataForm>;
  getCustomerId: MemoizedSelector<AppState, number>;

  getRemovalsData: MemoizedSelector<AppState, DataForm[]>;
  getRemovalsCount: MemoizedSelector<AppState, number>;

  getRecipientsData: MemoizedSelector<AppState, DataForm[]>;
  getRecipientsCount: MemoizedSelector<AppState, number>;

  getOrder: MemoizedSelector<AppState, PurchasseOrder>;
  getOrders: MemoizedSelector<AppState, PurchasseOrder[]>;
  getIeOrders: MemoizedSelector<AppState, ImportExport[]>;

  getClientZonesData: MemoizedSelector<AppState, MyClientZones[]>;
  getClientZonesCount: MemoizedSelector<AppState, number>;

  getPrixZoneMotoData: MemoizedSelector<AppState, PrixZone>;
  getPrixZoneCamionnetteData: MemoizedSelector<AppState, PrixZone>;

  getContactData: MemoizedSelector<AppState, Contact[]>;
  getContactCount: MemoizedSelector<AppState, number>;

  getToasterData: MemoizedSelector<AppState, Toaster[]>;
  getToasterCount: MemoizedSelector<AppState, number>;
}

export const selectors: Selectors = {
  getCustomer: createSelector(getCustomerState, CustomerSelector.customer ),
  getCustomerId: createSelector(getCustomerState, CustomerSelector.customerId ),

  getRemovalsData: createSelector(getRemovalsState, RemovalSelectors.data ),
  getRemovalsCount: createSelector(getRemovalsState, RemovalSelectors.count ),

  getRecipientsData: createSelector(getRecipientsState, RecipientSelectors.data ),
  getRecipientsCount: createSelector(getRecipientsState, RecipientSelectors.count ),

  getOrder: createSelector(getOrderState, PurchasseOrderSelector.order ),
  getOrders: createSelector(getOrdersState, OrderSelector.orders ),
  getIeOrders: createSelector(getIeOrdersState, ieOrderSelector.ieorders ),

  getClientZonesData: createSelector(getClientZonesState, ClientZonesSelector.data ),
  getClientZonesCount: createSelector(getClientZonesState, ClientZonesSelector.count ),

  getPrixZoneMotoData: createSelector(getPrixZoneMotoState, PrixZoneMotoSelector.data ),
  getPrixZoneCamionnetteData: createSelector(getPrixZoneCamionnetteState, PrixZoneCamionnetteSelector.data ),

  getContactData: createSelector(contactState, ContactSelector.data ),
  getContactCount: createSelector(contactState, ContactSelector.count ),

  getToasterData: createSelector(toasterState, ToasterSelector.data ),
  getToasterCount: createSelector(toasterState, ToasterSelector.count ),

}
