import {DataForm, DataDataFormState} from '../models/DataForm';
import {PurchasseOrder} from '../models/purchasseOrder';
import {createSelector, ActionReducerMap, createFeatureSelector, MemoizedSelector} from '@ngrx/store';
import {
  clientZonesReducer,
  customerReducer,
  ordersReducer,
  purchasseOrderReducer,
  prixZoneMotoReducer,
  prixZoneCamionnetteReducer,
  recipientReducer,
  removalReducer,
  CustomerSelector,
  RemovalSelectors,
  RecipientSelectors,
  PurchasseOrderSelector,
  OrderSelector,
  ClientZonesSelector,
  PrixZoneMotoSelector, PrixZoneCamionnetteSelector, contactReducer, ContactSelector
} from '../reducers/all.reducer';
import {MyClientZones, MyClientZonesState} from '../models/my-client-zones';
import {PrixZone, MyPrixZoneState} from "../models/prixZone";
import {ContactState, Contact} from "../models/contact";

export interface AppState {
  customer: DataForm;
  removals: DataDataFormState;
  recipients: DataDataFormState;
  order: PurchasseOrder;
  orders: PurchasseOrder[];
  clientZones: MyClientZonesState;
  prixZoneMoto: MyPrixZoneState;
  prixZoneCamionnette: MyPrixZoneState;
  contact: ContactState;
}

export const reducers: ActionReducerMap<AppState> = {
  customer: customerReducer,
  removals: removalReducer,
  recipients: recipientReducer,
  order: purchasseOrderReducer,
  orders: ordersReducer,
  clientZones: clientZonesReducer,
  prixZoneMoto: prixZoneMotoReducer,
  prixZoneCamionnette: prixZoneCamionnetteReducer,
  contact: contactReducer
};

const getCustomerState = createFeatureSelector('customer');
const getRemovalsState = createFeatureSelector('removals');
const getRecipientsState = createFeatureSelector('recipients');
const getOrderState = createFeatureSelector('order');
const getOrdersState = createFeatureSelector('orders');
const getClientZonesState = createFeatureSelector('clientZones');
const getPrixZoneMotoState = createFeatureSelector('prixZoneMoto');
const getPrixZoneCamionnetteState = createFeatureSelector('prixZoneCamionnette');
const contactState = createFeatureSelector('contact');

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

  getClientZonesData: MemoizedSelector<AppState, MyClientZones[]>;
  getClientZonesCount: MemoizedSelector<AppState, number>;

  getPrixZoneMotoData: MemoizedSelector<AppState, PrixZone>;
  getPrixZoneCamionnetteData: MemoizedSelector<AppState, PrixZone>;

  getContactData: MemoizedSelector<AppState, Contact[]>;
  getContactCount: MemoizedSelector<AppState, number>;
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

  getClientZonesData: createSelector(getClientZonesState, ClientZonesSelector.data ),
  getClientZonesCount: createSelector(getClientZonesState, ClientZonesSelector.count ),

  getPrixZoneMotoData: createSelector(getPrixZoneMotoState, PrixZoneMotoSelector.data ),
  getPrixZoneCamionnetteData: createSelector(getPrixZoneCamionnetteState, PrixZoneCamionnetteSelector.data ),

  getContactData: createSelector(contactState, ContactSelector.data ),
  getContactCount: createSelector(contactState, ContactSelector.count ),

}
