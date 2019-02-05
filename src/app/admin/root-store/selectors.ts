/**
 * Created by tirli on 05-02-19.
 */
import {createSelector, MemoizedSelector} from "@ngrx/store";
import {
  ClientsStoreSelectors
} from './clients-store';


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
