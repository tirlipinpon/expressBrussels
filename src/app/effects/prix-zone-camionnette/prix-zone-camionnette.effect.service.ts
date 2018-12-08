import { Injectable } from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Action} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {GetPrixZoneService} from "../../services/get-prix-zone.service";
import * as PrixZoneCamionnetteActions  from '../../actions/prixZoneCamionnette.actions';
import {switchMap, map, catchError} from "rxjs/internal/operators";


@Injectable()
export class PrixZoneCamionnetteEffectService {

  constructor(private action$: Actions,
              private notif: NotificationService,
              private getPrixZoneService: GetPrixZoneService) { }

  @Effect() getPrizZoneCamionnette$ = this.action$.pipe(
    ofType(PrixZoneCamionnetteActions.GET_PRIX_ZONE_CAMIONNETTE),
    switchMap(action =>
      this.getPrixZoneService.getPrixZoneByType(action['payload']).pipe(
        map(payload => {
          const data = ' zone1: ' + payload['data']['zone1'] + ' zone2: ' + (payload['data']['zone2']) + ' zone3: ' + (payload['data']['zone3'])
          this.notif.notify('info', 'get prix zones Camionnette', data);
          return new PrixZoneCamionnetteActions.GetPrixZoneCamionnetteSuccess(payload);
        }),
        catchError(err => {
          this.notif.notify('error', 'Get prix zone Camionnette', err);
          return of(new PrixZoneCamionnetteActions.GetPrixZoneCamionnetteFail(err))
        })
      )

    )
  )


}
