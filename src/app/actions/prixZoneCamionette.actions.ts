import {Action} from '@ngrx/store';
import {PrixZone} from "../models/prixZone";


export const GET_PRIX_ZONE_CAMIONETTE = 'Get prix zone Camionette';
export class GetPrixZoneCamionette implements Action {
  readonly type = GET_PRIX_ZONE_CAMIONETTE;
  constructor(public payload: {id: number, table: string}) {
    console.log('in actions get prix zone Camionette payload:', payload);
  }
}

export const GET_PRIX_ZONE_CAMIONETTE_SUCCESS = 'Get prix zone Camionette Success';
export class GetPrixZoneCamionetteSuccess implements Action {
  readonly type = GET_PRIX_ZONE_CAMIONETTE_SUCCESS;
  constructor(public payload: PrixZone) {
    // console.log('in actions get Prix Zone Camionette success payload= ',payload);
  }
}

export const GET_PRIX_ZONE_CAMIONETTE_FAIL = 'Get prix zone Camionette Fail';
export class GetPrixZoneCamionetteFail implements Action {
  readonly type = GET_PRIX_ZONE_CAMIONETTE_FAIL;
  constructor(public payload: string) {
    console.log('in actions get Prix Zone Camionette fail payload= ',payload);
  }
}

// =============================================================

export type All =
  GetPrixZoneCamionette
| GetPrixZoneCamionetteSuccess
| GetPrixZoneCamionetteFail;
