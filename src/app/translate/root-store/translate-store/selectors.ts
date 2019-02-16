/**
 * Created by tirli on 16-02-19.
 */
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import {OrderTranslateState, orderTranslateAdapter} from './state';
import {OrderTranslate} from "../../../models/translate";

export const getError = (state: OrderTranslateState): any => state.error;
export const getIsLoading = (state: OrderTranslateState): boolean => state.isLoading;

export const selectOrderTranslateState: MemoizedSelector<object, OrderTranslateState>
  = createFeatureSelector<OrderTranslateState>('order-translate');

export const selectAllOrderTranslateItems: (state: object) => OrderTranslate[]
  = orderTranslateAdapter.getSelectors(selectOrderTranslateState).selectAll;

export const selectOrderTranslateById = (id: number) =>
  createSelector(this.selectAllOrderTranslateItems, (allOrderTranslates: OrderTranslate[]) => {
    if (allOrderTranslates) {
      return allOrderTranslates.find(p => p.id === id);
    } else {
      return null;
    }
  });

export const selectOrderTranslateError: MemoizedSelector<object, any> = createSelector(
  selectOrderTranslateState,
  getError
);

export const selectOrderTranslateIsLoading: MemoizedSelector<
  object,
  boolean
  > = createSelector(selectOrderTranslateState, getIsLoading);
