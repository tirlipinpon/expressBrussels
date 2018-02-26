import {Injectable} from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {Actions, Effect} from "@ngrx/effects";
import {Action, Store} from "@ngrx/store";
import {AppState} from "../../shared/appState";
import { Observable } from 'rxjs/Observable';
import * as ClientZonesActions  from '../../actions/clientZones.actions';
import {ClientZonesService} from "../../services/client-zones.service";

@Injectable()
export class ClientZonesEffectService {

  constructor(private store: Store<AppState>,
              private action$: Actions,
              private notif: NotificationService,
              private clientZonesService: ClientZonesService) {
  }

  @Effect() getClientZones$: Observable<Action> = this.action$
    .ofType(ClientZonesActions.GET_CLIENT_ZONES)
    .switchMap(action =>
        this.clientZonesService.getClientZones()
          .map((payload) => {
            this.notif.notify('info', 'get client zones', 'data ok '+ payload.count);
            return new ClientZonesActions.GetClientZonesSuccess(payload);
          })
          .catch(err => {
            this.notif.notify('error', 'Get client zones', err);
            return Observable.of(new ClientZonesActions.GetClientZonesFail(err))
          })

    );

}
