import {DataForm, DataDataFormState} from '../models/DataForm';
import {PurchasseOrder} from '../models/purchasseOrder';
import {createSelector, ActionReducerMap, createFeatureSelector, MemoizedSelector} from '@ngrx/store';
import {
  ordersReducer, purchasseOrderReducer, recipientReducer, removalReducer,
  customerReducer, CustomerSelector, RemovalSelectors, RecipientSelectors, PurchasseOrderSelector, OrderSelector,
  clientZonesReducer, ClientZonesSelector
} from '../reducers/all.reducer';
import {MyClientZones, MyClientZonesState} from '../models/my-client-zones';

export interface AppState {
  customer: DataForm;
  removals: DataDataFormState;
  recipients: DataDataFormState;
  order: PurchasseOrder;
  orders: PurchasseOrder[];
  clientZones: MyClientZonesState;
}

export const reducers: ActionReducerMap<AppState> = {
  customer: customerReducer,
  removals: removalReducer,
  recipients: recipientReducer,
  order: purchasseOrderReducer,
  orders: ordersReducer,
  clientZones: clientZonesReducer
};

const getCustomerState = createFeatureSelector('customer');
const getRemovalsState = createFeatureSelector('removals');
const getRecipientsState = createFeatureSelector('recipients');
const getOrderState = createFeatureSelector('order');
const getOrdersState = createFeatureSelector('orders');
const getClientZonesState = createFeatureSelector('clientZones');

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

}
