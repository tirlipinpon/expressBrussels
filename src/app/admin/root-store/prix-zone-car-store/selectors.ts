/**
 * Created by tirli on 30-01-19.
 */
import {PrixZonesCarState, prixZonesCarAdapter} from "./state";
import {MemoizedSelector, createFeatureSelector, createSelector} from "@ngrx/store";
import {PrixZone} from "../../../models/PrixZone";


export const getError = (state: PrixZonesCarState): any => state.error;
export const getIsLoading = (state: PrixZonesCarState): boolean => state.isLoading;

export const selectPrixZonesCarState: MemoizedSelector<object, PrixZonesCarState> = createFeatureSelector<PrixZonesCarState>('admin-prix-zones-car');

export const selectAllItems: (state: object) => PrixZone[] = prixZonesCarAdapter.getSelectors(selectPrixZonesCarState).selectAll;
export const selectTotal: (state: object) => number = prixZonesCarAdapter.getSelectors(selectPrixZonesCarState).selectTotal;

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

export const selectPrixZonesCarItems =
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


export const selectPrixZonesCarError: MemoizedSelector<object, any> =
  createSelector(
    selectPrixZonesCarState,
    getError
  );

export const selectPrixZonesCarIsLoading: MemoizedSelector<object, boolean> =
  createSelector(
    selectPrixZonesCarState,
    getIsLoading
  );
