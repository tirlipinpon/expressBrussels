import { Injectable } from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {Actions, Effect} from "@ngrx/effects";
import {Action} from "@ngrx/store";
import {Observable} from "rxjs";
import {GetPrixZoneService} from "../../services/get-prix-zone.service";
import * as PrixZoneMotoActions  from '../../actions/prixZoneMoto.actions';


@Injectable()
export class PrixZoneMotoEffectService {

  constructor(private action$: Actions,
              private notif: NotificationService,
              private getPrixZoneService: GetPrixZoneService) { }

  @Effect() getPrizZoneMoto$: Observable<Action> = this.action$
    .ofType(PrixZoneMotoActions.GET_PRIX_ZONE_MOTO)
    // .do(action => console.log(action['payload']))
    .switchMap(action =>
      this.getPrixZoneService.getPrixZoneByType(action['payload'])
        .map(payload => {
          const data = ' zone1: ' + payload['data']['zone1'] + ' zone2: ' + (payload['data']['zone2']) + ' zone2: ' + (payload['data']['zone1'])
          this.notif.notify('info', 'get prix zones moto', data);
          return new PrixZoneMotoActions.GetPrixZoneMotoSuccess(payload);
        })
        .catch(err => {
          this.notif.notify('error', 'Get prix zone moto', err);
          return Observable.of(new PrixZoneMotoActions.GetPrixZoneMotoFail(err))
        })
    )

}
