import { Injectable } from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Action} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {GetPrixZoneService} from "../../services/get-prix-zone.service";
import * as PrixZoneMotoActions  from '../../actions/prixZoneMoto.actions';
import {switchMap, map, catchError} from "rxjs/internal/operators";


@Injectable()
export class PrixZoneMotoEffectService {

  constructor(private action$: Actions,
              private notif: NotificationService,
              private getPrixZoneService: GetPrixZoneService) { }

  @Effect() getPrizZoneMoto$ = this.action$.pipe(
    ofType(PrixZoneMotoActions.GET_PRIX_ZONE_MOTO),
    switchMap(action =>
      this.getPrixZoneService.getPrixZoneByType(action['payload']).pipe(
        map(payload => {
          const data = ' zone1: ' + payload['data']['zone1'] + ' zone2: ' + (payload['data']['zone2']) + ' zone3: ' + (payload['data']['zone3'])
          // this.notif.notify('info', 'get prix zones moto', data);
          return new PrixZoneMotoActions.GetPrixZoneMotoSuccess(payload);
        }),
        catchError(err => {
          // this.notif.notify('error', 'Get prix zone moto', err);
          return of(new PrixZoneMotoActions.GetPrixZoneMotoFail(err))
        })
      )

    )
  )


}
