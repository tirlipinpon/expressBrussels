/**
 * Created by tirli on 13-02-19.
 */
import {ImportExportState, importExportAdapter} from "./state";
import {MemoizedSelector, createFeatureSelector, createSelector} from "@ngrx/store";
import {ImportExport} from "../../../models/import-export";


export const selectImportExportState: MemoizedSelector<object, ImportExportState>
  = createFeatureSelector<ImportExportState>('admin-import-export');

export const getError = (state: ImportExportState): any => state.error;
export const getIsLoading = (state: ImportExportState): boolean => state.isLoading;

export const selectAllItems: (state: object) => ImportExport[] = importExportAdapter.getSelectors(selectImportExportState).selectAll;
export const selectTotal: (state: object) => number = importExportAdapter.getSelectors(selectImportExportState).selectTotal;


export const selectImportExportItems =
  createSelector(
    selectAllItems,
    (allMyFeatures: ImportExport[]) => {
      if (allMyFeatures) {
        return allMyFeatures;
      } else {
        return null;
      }
    });

export const selectImportExportItemsById = (client_id: number) =>
  createSelector(
    selectAllItems,
    (allMyFeatures: ImportExport[]) => {
      if (allMyFeatures) {
        let filtered = allMyFeatures.filter(p => {
          return client_id === p.fk_client_id;
        });
        return filtered;
      } else {
        return null;
      }
    });

export const selectImportExportError: MemoizedSelector<object, any> =
  createSelector(
    selectImportExportState,
    getError
  );

export const selectImportExportByMonth = (month: number) =>
  createSelector(
    selectAllItems,
    (allMyFeatures: ImportExport[]) => {
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
