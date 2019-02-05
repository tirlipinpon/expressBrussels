import {Action} from '@ngrx/store';
import {PrixZone} from "../models/prixZone";


export const GET_PRIX_ZONE_CAMIONNETTE = 'Get prix zone Camionnette';
export class GetPrixZoneCamionnette implements Action {
  readonly type = GET_PRIX_ZONE_CAMIONNETTE;
  constructor(public payload: {id: number, table: string}) {
    // console.log('in actions get prix zone Camionnette payload:', payload);
  }
}

export const GET_PRIX_ZONE_CAMIONNETTE_SUCCESS = 'Get prix zone Camionnette Success';
export class GetPrixZoneCamionnetteSuccess implements Action {
  readonly type = GET_PRIX_ZONE_CAMIONNETTE_SUCCESS;
  constructor(public payload: PrixZone) {
    // console.log('in actions get Prix Zone Camionnette success payload= ',payload);
  }
}

export const GET_PRIX_ZONE_CAMIONNETTE_FAIL = 'Get prix zone Camionnette Fail';
export class GetPrixZoneCamionnetteFail implements Action {
  readonly type = GET_PRIX_ZONE_CAMIONNETTE_FAIL;
  constructor(public payload: string) {
    console.log('in actions get Prix Zone Camionnette fail payload= ',payload);
  }
}

// =============================================================

export type All =
  GetPrixZoneCamionnette
| GetPrixZoneCamionnetteSuccess
| GetPrixZoneCamionnetteFail;
