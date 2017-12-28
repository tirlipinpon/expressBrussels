import {DataForm, DataDataFormState} from "../models/DataForm";
import {PurchasseOrder} from "../models/purchasseOrder";
import {createSelector, ActionReducerMap, createFeatureSelector, MemoizedSelector} from "@ngrx/store";
import {
  ordersReducer, purchasseOrderReducer, recipientReducer, removalReducer,
  customerReducer, CustomerSelector, RemovalSelectors, RecipientSelectors, PurchasseOrderSelector, OrderSelector
} from "../reducers/all.reducer";

export interface AppState {
  customer: DataDataFormState;
  removals: DataDataFormState;
  recipients: DataForm[];
  order: PurchasseOrder;
  orders: PurchasseOrder[];
}

// export const reducers: ActionReducerMap<AppState> = {
//   customer: customerReducer,
//   removals: removalReducer,
//   recipients: recipientReducer,
//   order: purchasseOrderReducer,
//   orders: ordersReducer
// };

const getCustomerState = createFeatureSelector('customer');
const getRemovalsState = createFeatureSelector('removals');
const getRecipientsState = createFeatureSelector('recipients');
const getOrderState = createFeatureSelector('order');
const getOrdersState = createFeatureSelector('orders');

// export const rootSelectors = {
//   customer: createSelector(getCustomerState, (state: AppState) => { return state.customer}),
//   removals: createSelector(getRemovalsState, (state: AppState) => { return state.removals}),
//   recipients: createSelector(getRecipientsState, (state: AppState) => { return state.recipients}),
//   order: createSelector(getOrderState, (state: AppState) => { return state.order}),
//   orders: createSelector(getOrdersState, (state: AppState) => { return state.orders}),
// };

export interface Selectors {
  getCustomer: MemoizedSelector<AppState, DataForm>;

  getRemovalsData: MemoizedSelector<AppState, DataForm[]>;
  getRemovalsCount: MemoizedSelector<AppState, number>;

  getRecipientsData: MemoizedSelector<AppState, DataForm[]>;
  getRecipientsCount: MemoizedSelector<AppState, number>;

  getOrder: MemoizedSelector<AppState, PurchasseOrder>;
  getOrders: MemoizedSelector<AppState, PurchasseOrder[]>;
}

export const selectors: Selectors = {
  getCustomer: createSelector(getCustomerState, CustomerSelector.customer ),

  getRemovalsData: createSelector(getRemovalsState, RemovalSelectors.data ),
  getRemovalsCount: createSelector(getRemovalsState, RemovalSelectors.count ),

  getRecipientsData: createSelector(getRecipientsState, RecipientSelectors.data ),
  getRecipientsCount: createSelector(getRecipientsState, RecipientSelectors.count ),

  getOrder: createSelector(getOrderState, PurchasseOrderSelector.order ),
  getOrders: createSelector(getOrdersState, OrderSelector.orders ),
}
