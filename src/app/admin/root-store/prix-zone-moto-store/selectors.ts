/**
 * Created by tirli on 30-01-19.
 */
import {PrixZonesMotoState, prixZonesMotoAdapter} from "./state";
import {MemoizedSelector, createFeatureSelector, createSelector} from "@ngrx/store";
import {PrixZone} from "../../../models/PrixZone";


export const getError = (state: PrixZonesMotoState): any => state.error;
export const getIsLoading = (state: PrixZonesMotoState): boolean => state.isLoading;

export const selectPrixZonesMotoState: MemoizedSelector<object, PrixZonesMotoState> = createFeatureSelector<PrixZonesMotoState>('admin-prix-zones-moto');

export const selectAllItems: (state: object) => PrixZone[] = prixZonesMotoAdapter.getSelectors(selectPrixZonesMotoState).selectAll;
export const selectTotal: (state: object) => number = prixZonesMotoAdapter.getSelectors(selectPrixZonesMotoState).selectTotal;

export const selectZoneById = (id: number) =>
  createSelector(
    selectAllItems,
    (allMyFeatures: PrixZone[]) => {
      if (allMyFeatures) {
        return allMyFeatures.find(p => +p.id === id);
      } else {
        return null;
      }
    });

export const selectPrixZonesMotoItems =
  createSelector(
    selectAllItems,
    (allMyFeatures: PrixZone[]) => {
      if (allMyFeatures) {
        return allMyFeatures;
      } else {
        return null;
      }
    });

export const selectZonesByClientId = (id: number) =>
  createSelector(
    selectAllItems,
    (allMyFeatures: PrixZone[]) => {
      if (allMyFeatures) {
        const resp =  allMyFeatures.find(p => {
          const a = +p.id_client;
          const b = +id;
          return a === b
        });
        return resp;
      } else {
        return null;
      }
    });


export const selectPrixZonesMotoError: MemoizedSelector<object, any> =
  createSelector(
    selectPrixZonesMotoState,
    getError
  );

export const selectPrixZonesMotoIsLoading: MemoizedSelector<object, boolean> =
  createSelector(
    selectPrixZonesMotoState,
    getIsLoading
  );
