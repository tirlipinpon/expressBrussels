import { Injectable } from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {Actions, Effect} from "@ngrx/effects";
import {AppState} from "../../shared/appState";
import {Store, Action} from "@ngrx/store";
import * as PrixZoneCamionetteActions  from '../../actions/prixZoneCamionette.actions';
import {Observable} from "rxjs";
import {GetPrixZoneService} from "../../services/get-prix-zone.service";


@Injectable()
export class PrixZoneCamionetteEffectService {

  constructor(private store: Store<AppState>,
              private action$: Actions,
              private notif: NotificationService,
              private getPrixZoneService: GetPrixZoneService) { }

  @Effect() getPrizZoneCamionette$: Observable<Action> = this.action$
    .ofType(PrixZoneCamionetteActions.GET_PRIX_ZONE_CAMIONETTE)
    .do(action => console.log(action['payload']))
    .switchMap(action =>
      this.getPrixZoneService.getPrixZoneByType(action['payload'])
        .map(payload => {
          const data = ' zone1: ' + payload['data']['zone1'] + ' zone2: ' + (payload['data']['zone2']) + ' zone2: ' + (payload['data']['zone1'])
          this.notif.notify('info', 'get prix zones Camionette', data);
          return new PrixZoneCamionetteActions.GetPrixZoneCamionetteSuccess(payload);
        })
        .catch(err => {
          this.notif.notify('error', 'Get prix zone Camionette', err);
          return Observable.of(new PrixZoneCamionetteActions.GetPrixZoneCamionetteFail(err))
        })
    )

}
