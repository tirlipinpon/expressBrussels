import { Action } from '@ngrx/store';
import {PrixZone} from "../../../models/PrixZone";

export enum PrixZonesMotoActionTypes {
  LOAD_REQUEST = '[PRIX ZONE MOTO] LOAD REQUEST',
  LOAD_FAILURE = '[PRIX ZONE MOTO] LOAD FAILURE',
  LOAD_SUCCESS = '[PRIX ZONE MOTO] LOAD SUCCESS',

  ADD_REQUEST = '[PRIX ZONE MOTO] ADD REQUEST',
  ADD_FAILURE = '[PRIX ZONE MOTO] ADD FAILURE',
  ADD_SUCCESS = '[PRIX ZONE MOTO] ADD SUCCESS',

  REMOVE_REQUEST = '[PRIX ZONE MOTO] REMOVE REQUEST',
  REMOVE_FAILURE = '[PRIX ZONE MOTO] REMOVE FAILURE',
  REMOVE_SUCCESS = '[PRIX ZONE MOTO] REMOVE SUCCESS',

  UPDATE_REQUEST = '[PRIX ZONE MOTO] UPDATE REQUEST',
  UPDATE_FAILURE = '[PRIX ZONE MOTO] UPDATE FAILURE',
  UPDATE_SUCCESS = '[PRIX ZONE MOTO] UPDATE SUCCESS',

  UPSERT_REQUEST = '[PRIX ZONE MOTO] UPSERT REQUEST',
  UPSERT_FAILURE = '[PRIX ZONE MOTO] UPSERT FAILURE',
  UPSERT_SUCCESS = '[PRIX ZONE MOTO] UPSERT SUCCESS'
}
// ================= LOAD ===============
export class LoadRequestAction implements Action {
  readonly type = PrixZonesMotoActionTypes.LOAD_REQUEST;
}
export class LoadFailureAction implements Action {
  readonly type = PrixZonesMotoActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class LoadSuccessAction implements Action {
  readonly type = PrixZonesMotoActionTypes.LOAD_SUCCESS;
  constructor(public payload: { items: PrixZone[] }) {}
}
// ================= ADD ===============
export class AddRequestAction implements Action {
  readonly type = PrixZonesMotoActionTypes.ADD_REQUEST;
  constructor(public payload: {id_client: number, type: string}) {}
}
export class AddFailureAction implements Action {
  readonly type = PrixZonesMotoActionTypes.ADD_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class AddSuccessAction implements Action {
  readonly type = PrixZonesMotoActionTypes.ADD_SUCCESS;
  constructor(public payload: { item: PrixZone }) {}
}
// ================= REMOVE ONE ===============
export class RemoveRequestAction implements Action {
  readonly type = PrixZonesMotoActionTypes.REMOVE_REQUEST;
  constructor(public payload: string) {}
}
export class RemoveFailureAction implements Action {
  readonly type = PrixZonesMotoActionTypes.REMOVE_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class RemoveSuccessAction implements Action {
  readonly type = PrixZonesMotoActionTypes.REMOVE_SUCCESS;
  constructor(public payload: { item: PrixZone }) {}
}
// ================= UPDATE ONE ===============
export class UpdateRequestAction implements Action {
  readonly type = PrixZonesMotoActionTypes.UPDATE_REQUEST;
  constructor(public payload: {
    id: number,
    changes: PrixZone
  }) {}
}
export class UpdateFailureAction implements Action {
  readonly type = PrixZonesMotoActionTypes.UPDATE_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class UpdateSuccessAction implements Action {
  readonly type = PrixZonesMotoActionTypes.UPDATE_SUCCESS;
  constructor(public payload: { item: PrixZone }) {}
}
// ================= UPSERT ONE ===============
export class UpsertRequestAction implements Action {
  readonly type = PrixZonesMotoActionTypes.UPSERT_REQUEST;
  constructor(public payload: { item: PrixZone }) {}
}
export class UpsertFailureAction implements Action {
  readonly type = PrixZonesMotoActionTypes.UPSERT_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class UpsertSuccessAction implements Action {
  readonly type = PrixZonesMotoActionTypes.UPSERT_SUCCESS;
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
