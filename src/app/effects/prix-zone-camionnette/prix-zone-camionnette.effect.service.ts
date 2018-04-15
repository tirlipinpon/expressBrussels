import { Injectable } from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {Actions, Effect} from "@ngrx/effects";
import {Action} from "@ngrx/store";
import {Observable} from "rxjs";
import {GetPrixZoneService} from "../../services/get-prix-zone.service";
import * as PrixZoneCamionnetteActions  from '../../actions/prixZoneCamionnette.actions';


@Injectable()
export class PrixZoneCamionnetteEffectService {

  constructor(private action$: Actions,
              private notif: NotificationService,
              private getPrixZoneService: GetPrixZoneService) { }

  @Effect() getPrizZoneCamionnette$: Observable<Action> = this.action$
    .ofType(PrixZoneCamionnetteActions.GET_PRIX_ZONE_CAMIONNETTE)
    // .do(action => console.log(action['payload']))
    .switchMap(action =>
      this.getPrixZoneService.getPrixZoneByType(action['payload'])
        .map(payload => {
          const data = ' zone1: ' + payload['data']['zone1'] + ' zone2: ' + (payload['data']['zone2']) + ' zone2: ' + (payload['data']['zone1'])
          this.notif.notify('info', 'get prix zones Camionnette', data);
          return new PrixZoneCamionnetteActions.GetPrixZoneCamionnetteSuccess(payload);
        })
        .catch(err => {
          this.notif.notify('error', 'Get prix zone Camionnette', err);
          return Observable.of(new PrixZoneCamionnetteActions.GetPrixZoneCamionnetteFail(err))
        })
    )

}
