/**
 * Created by tirli on 13-02-19.
 */
import {TranslatesState, translatesAdapter} from "./state";
import {MemoizedSelector, createFeatureSelector, createSelector} from "@ngrx/store";
import {OrderTranslate} from "../../../models/translate";


export const selectTranslatesState: MemoizedSelector<object, TranslatesState> = createFeatureSelector<TranslatesState>('admin-translates');

export const getError = (state: TranslatesState): any => state.error;
export const getIsLoading = (state: TranslatesState): boolean => state.isLoading;

export const selectAllItems: (state: object) => OrderTranslate[] = translatesAdapter.getSelectors(selectTranslatesState).selectAll;
export const selectTotal: (state: object) => number = translatesAdapter.getSelectors(selectTranslatesState).selectTotal;


export const selectTranslatesItems =
  createSelector(
    selectAllItems,
    (allMyFeatures: OrderTranslate[]) => {
      if (allMyFeatures) {
        return allMyFeatures;
      } else {
        return null;
      }
    });

export const selectTranslatesItemsById = (client_id: number) =>
  createSelector(
    selectAllItems,
    (allMyFeatures: OrderTranslate[]) => {
      if (allMyFeatures) {
        let filtered = allMyFeatures.filter(p => {
          return client_id === p.fk_client_id;
        });
        return filtered;
      } else {
        return null;
      }
    });

export const selectTranslatesError: MemoizedSelector<object, any> =
  createSelector(
    selectTranslatesState,
    getError
  );

export const selectTranslatesByMonth = (month: number) =>
  createSelector(
    selectAllItems,
    (allMyFeatures: OrderTranslate[]) => {
      if (allMyFeatures) {
        if (month === -1) {
          return allMyFeatures;
        }
        let filtered = allMyFeatures.filter(p => {
          let date = new Date(p.created);
          let p_month = date.getMonth();
          let p_years = date.getFullYear();
          return p_month === month && p_years === new Date().getFullYear();
        });
        return filtered;
      } else {
        return null;
      }
    });
