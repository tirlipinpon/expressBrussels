import { Action } from '@ngrx/store';
import {ImportExport, Administration} from "../../../models/import-export";


export enum ImportExportActionTypes {
  LOAD_REQUEST = '[ImportExport] LOAD REQUEST',
  LOAD_FAILURE = '[ImportExport] LOAD FAILURE',
  LOAD_SUCCESS = '[ImportExport] LOAD SUCCESS',

  UPDATE_REQUEST = '[ImportExport] UPDATE REQUEST',
  UPDATE_FAILURE = '[ImportExport] UPDATE FAILURE',
  UPDATE_SUCCESS = '[ImportExport] UPDATE SUCCESS',

  UPDATE_ADMINISTRATIONS_REQUEST = '[ImportExport adminsitration] UPDATE REQUEST',
  UPDATE_ADMINISTRATIONS_FAILURE = '[ImportExport adminsitration] UPDATE FAILURE',
  UPDATE_ADMINISTRATIONS_SUCCESS = '[ImportExport adminsitration] UPDATE SUCCESS',

  SET_FAILURE = '[ImportExport] SET FAILURE'
}
// ================= LOAD ALL ===============
export class LoadRequestAction implements Action {
  readonly type = ImportExportActionTypes.LOAD_REQUEST;
  constructor() {}
}
export class LoadFailureAction implements Action {
  readonly type = ImportExportActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class LoadSuccessAction implements Action {
  readonly type = ImportExportActionTypes.LOAD_SUCCESS;
  constructor(public payload: { items: ImportExport[] }) {}
}
// ================= UPDATE ONE ===============
export class UpdateRequestAction implements Action {
  readonly type = ImportExportActionTypes.UPDATE_REQUEST;
  constructor(public payload: {
    id: number,
    changes: ImportExport
  }) {}
}
export class UpdateFailureAction implements Action {
  readonly type = ImportExportActionTypes.UPDATE_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class UpdateSuccessAction implements Action {
  readonly type = ImportExportActionTypes.UPDATE_SUCCESS;
  constructor(public payload: { item: ImportExport }) {}
}
// ================= SET FAILURE ===============
export class SetFailureAction implements Action {
  readonly type = ImportExportActionTypes.SET_FAILURE;
  constructor(public payload: { error: string }) {}
}
// ================= UPDATE ADMINISTRATION ===============
export class UpdateAdminRequestAction implements Action {
  readonly type = ImportExportActionTypes.UPDATE_ADMINISTRATIONS_REQUEST;
  constructor(public payload: { items: Administration[]} ) {}
}
export class UpdateAdminFailureAction implements Action {
  readonly type = ImportExportActionTypes.UPDATE_ADMINISTRATIONS_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class UpdateAdminSuccessAction implements Action {
  readonly type = ImportExportActionTypes.UPDATE_ADMINISTRATIONS_SUCCESS;
  constructor(public payload: { items: Administration[] }) {}
}


export type Actions =
    UpdateAdminRequestAction |
    UpdateAdminFailureAction |
    UpdateAdminSuccessAction |

    LoadRequestAction |
    LoadFailureAction |
    LoadSuccessAction |

    UpdateRequestAction |
    UpdateFailureAction |
    UpdateSuccessAction |

    SetFailureAction;

