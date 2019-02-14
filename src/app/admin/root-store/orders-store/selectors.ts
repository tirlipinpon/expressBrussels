/**
 * Created by tirli on 13-02-19.
 */
import {OrdersState, ordersAdapter} from "./state";
import {MemoizedSelector, createFeatureSelector, createSelector} from "@ngrx/store";
import {PurchasseOrder} from "../../../models/PurchasseOrder";


export const getError = (state: OrdersState): any => state.error;
export const getIsLoading = (state: OrdersState): boolean => state.isLoading;

export const selectOrdersState: MemoizedSelector<object, OrdersState> = createFeatureSelector<OrdersState>('admin-orders');

export const selectAllItems: (state: object) => PurchasseOrder[] = ordersAdapter.getSelectors(selectOrdersState).selectAll;
export const selectTotal: (state: object) => number = ordersAdapter.getSelectors(selectOrdersState).selectTotal;


export const selectOrdersItems =
  createSelector(
    selectAllItems,
    (allMyFeatures: PurchasseOrder[]) => {
      if (allMyFeatures) {
        return allMyFeatures;
      } else {
        return null;
      }
    });

export const selectOrdersError: MemoizedSelector<object, any> =
  createSelector(
    selectOrdersState,
    getError
  );
