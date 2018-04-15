import {Action} from '@ngrx/store';
import {PrixZone} from "../models/prixZone";


export const GET_PRIX_ZONE_MOTO = 'Get prix zone moto';
export class GetPrixZoneMoto implements Action {
  readonly type = GET_PRIX_ZONE_MOTO;
  constructor(public payload: {id: number, table: string}) {
    console.log('in actions get prix zone moto payload:', payload);
  }
}

export const GET_PRIX_ZONE_MOTO_SUCCESS = 'Get prix zone moto Success';
export class GetPrixZoneMotoSuccess implements Action {
  readonly type = GET_PRIX_ZONE_MOTO_SUCCESS;
  constructor(public payload: PrixZone) {
    // console.log('in actions get Prix Zone Moto success payload= ',payload);
  }
}

export const GET_PRIX_ZONE_MOTO_FAIL = 'Get prix zone moto Fail';
export class GetPrixZoneMotoFail implements Action {
  readonly type = GET_PRIX_ZONE_MOTO_FAIL;
  constructor(public payload: string) {
    console.log('in actions get Prix Zone Moto fail payload= ',payload);
  }
}

// =============================================================

export type All =
  GetPrixZoneMoto
| GetPrixZoneMotoSuccess
| GetPrixZoneMotoFail;
