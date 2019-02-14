/**
 * Created by tirli on 05-02-19.
 */

import {createSelector, MemoizedSelector} from "@ngrx/store";

import {
  ClientsStoreSelectors
} from './clients-store';
import {
  OrdersStoreSelectors
} from './orders-store';
import {
  PrixZonesMotoStoreSelectors
} from './prix-zone-moto-store';

export const selectError: MemoizedSelector<object, string> =
  createSelector (
    ClientsStoreSelectors.selectClientsError,
    (clientsError: string) => { return clientsError; }
  );

export const selectIsLoading: MemoizedSelector<object, boolean> =
  createSelector (
    ClientsStoreSelectors.selectClientsIsLoading,
    (clientsIsSelect: boolean) => {  return clientsIsSelect; }
  );
