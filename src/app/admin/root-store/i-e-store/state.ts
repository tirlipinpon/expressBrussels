/**
 * Created by tirli on 13-02-19.
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {ImportExport} from "../../../models/import-export";



export const importExportAdapter: EntityAdapter<ImportExport> = createEntityAdapter<ImportExport>({
  selectId: model => model.id,
  sortComparer: (a: ImportExport, b: ImportExport): number =>
    b.created.toString().localeCompare(a.created.toString())
});

export interface ImportExportState extends EntityState<ImportExport> {
  isLoading?: boolean;
  error?: any;
}

export const initalImportExportState: ImportExportState = importExportAdapter.getInitialState({
  isLoading: false,
  error: null
});
