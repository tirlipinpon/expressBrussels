import {Action} from "@ngrx/store";
import {MyClientZonesState} from "../models/my-client-zones";

export const GET_CLIENT_ZONES = 'Get client Zones';
export class GetClientZones implements Action {
  readonly type = GET_CLIENT_ZONES;
  constructor() {
    console.log('in actions get client zones');
  }
}

export const GET_CLIENT_ZONES_SUCCESS = 'Get client Zones Success';
export class GetClientZonesSuccess implements Action {
  readonly type = GET_CLIENT_ZONES_SUCCESS;
  constructor(public payload: MyClientZonesState) {
    console.log('in actions get client zones success payload= ',payload);
  }
}

export const GET_CLIENT_ZONES_FAIL = 'Get client Zones Fail';
export class GetClientZonesFail implements Action {
  readonly type = GET_CLIENT_ZONES_FAIL;
  constructor(public payload: string) {
    console.log('in actions get client zones fail payload= ',payload);
  }
}

//=============================================================

export type All =
  GetClientZones
| GetClientZonesSuccess
| GetClientZonesFail;
