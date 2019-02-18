/**
 * Created by tirli on 18-02-19.
 */
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';


import {ImportExportState, importExportAdapter} from './state';
import {ImportExport} from "../../../models/import-export";

export const getError = (state: ImportExportState): any => state.error;

export const getIsLoading = (state: ImportExportState): boolean => state.isLoading;

export const selectImportExportState: MemoizedSelector<object, ImportExportState>
  = createFeatureSelector<ImportExportState>('order-import-export');

export const selectAllImportExportItems: (
  state: object
) => ImportExport[] = importExportAdapter.getSelectors(selectImportExportState).selectAll;

export const selectImportExportByClientId = (id: number) =>
  createSelector(this.selectAllImportExportItems, (allMyFeatures: ImportExport[]) => {
    if (allMyFeatures) {
      return allMyFeatures.find(p => p.id === id);
    } else {
      return null;
    }
  });

export const selectImportExportError: MemoizedSelector<object, any> = createSelector(
  selectImportExportState,
  getError
);

export const selectImportExportIsLoading: MemoizedSelector<
  object,
  boolean
  > = createSelector(selectImportExportState, getIsLoading);
