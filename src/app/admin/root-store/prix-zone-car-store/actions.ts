import { Action } from '@ngrx/store';
import {PrixZone} from "../../../models/PrixZone";

export enum PrixZonesCarActionTypes {
  LOAD_REQUEST = '[PRIX ZONE CAR] LOAD REQUEST',
  LOAD_FAILURE = '[PRIX ZONE CAR] LOAD FAILURE',
  LOAD_SUCCESS = '[PRIX ZONE CAR] LOAD SUCCESS',

  ADD_REQUEST = '[PRIX ZONE CAR] ADD REQUEST',
  ADD_FAILURE = '[PRIX ZONE CAR] ADD FAILURE',
  ADD_SUCCESS = '[PRIX ZONE CAR] ADD SUCCESS',

  REMOVE_REQUEST = '[PRIX ZONE CAR] REMOVE REQUEST',
  REMOVE_FAILURE = '[PRIX ZONE CAR] REMOVE FAILURE',
  REMOVE_SUCCESS = '[PRIX ZONE CAR] REMOVE SUCCESS',

  UPDATE_REQUEST = '[PRIX ZONE CAR] UPDATE REQUEST',
  UPDATE_FAILURE = '[PRIX ZONE CAR] UPDATE FAILURE',
  UPDATE_SUCCESS = '[PRIX ZONE CAR] UPDATE SUCCESS',

  UPSERT_REQUEST = '[PRIX ZONE CAR] UPSERT REQUEST',
  UPSERT_FAILURE = '[PRIX ZONE CAR] UPSERT FAILURE',
  UPSERT_SUCCESS = '[PRIX ZONE CAR] UPSERT SUCCESS'
}
// ================= LOAD ===============
export class LoadRequestAction implements Action {
  readonly type = PrixZonesCarActionTypes.LOAD_REQUEST;
}
export class LoadFailureAction implements Action {
  readonly type = PrixZonesCarActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class LoadSuccessAction implements Action {
  readonly type = PrixZonesCarActionTypes.LOAD_SUCCESS;
  constructor(public payload: { items: PrixZone[] }) {}
}
// ================= ADD ===============
export class AddRequestAction implements Action {
  readonly type = PrixZonesCarActionTypes.ADD_REQUEST;
  constructor(public payload: {id_client: number, type: string}) {}
}
export class AddFailureAction implements Action {
  readonly type = PrixZonesCarActionTypes.ADD_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class AddSuccessAction implements Action {
  readonly type = PrixZonesCarActionTypes.ADD_SUCCESS;
  constructor(public payload: { item: PrixZone }) {}
}
// ================= REMOVE ONE ===============
export class RemoveRequestAction implements Action {
  readonly type = PrixZonesCarActionTypes.REMOVE_REQUEST;
  constructor(public payload: string) {}
}
export class RemoveFailureAction implements Action {
  readonly type = PrixZonesCarActionTypes.REMOVE_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class RemoveSuccessAction implements Action {
  readonly type = PrixZonesCarActionTypes.REMOVE_SUCCESS;
  constructor(public payload: { item: PrixZone }) {}
}
// ================= UPDATE ONE ===============
export class UpdateRequestAction implements Action {
  readonly type = PrixZonesCarActionTypes.UPDATE_REQUEST;
  constructor(public payload: {
    id: number,
    changes: PrixZone
  }) {}
}
export class UpdateFailureAction implements Action {
  readonly type = PrixZonesCarActionTypes.UPDATE_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class UpdateSuccessAction implements Action {
  readonly type = PrixZonesCarActionTypes.UPDATE_SUCCESS;
  constructor(public payload: { item: PrixZone }) {}
}
// ================= UPSERT ONE ===============
export class UpsertRequestAction implements Action {
  readonly type = PrixZonesCarActionTypes.UPSERT_REQUEST;
  constructor(public payload: { item: PrixZone }) {}
}
export class UpsertFailureAction implements Action {
  readonly type = PrixZonesCarActionTypes.UPSERT_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class UpsertSuccessAction implements Action {
  readonly type = PrixZonesCarActionTypes.UPSERT_SUCCESS;
  constructor(public payload: { item: PrixZone }) {}
}

export type Actions =
    LoadRequestAction |
    LoadFailureAction |
    LoadSuccessAction |

    AddRequestAction |
    AddFailureAction |
    AddSuccessAction |

    RemoveRequestAction |
    RemoveFailureAction |
    RemoveSuccessAction |

    UpdateRequestAction |
    UpdateFailureAction |
    UpdateSuccessAction |

    UpsertRequestAction |
    UpsertFailureAction |
    UpsertSuccessAction;
