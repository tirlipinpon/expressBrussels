import {Injectable} from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {AppState} from '../../shared/appState';
import {Observable, of} from 'rxjs';
import * as ClientZonesActions  from '../../actions/clientZones.actions';
import {ClientZonesService} from '../../services/client-zones.service';
import {catchError, map, switchMap} from "rxjs/internal/operators";

@Injectable()
export class ClientZonesEffectService {

  constructor(private store: Store<AppState>,
              private action$: Actions,
              private notif: NotificationService,
              private clientZonesService: ClientZonesService) {
  }

  @Effect() getClientZones$ = this.action$.pipe(
    ofType(ClientZonesActions.GET_CLIENT_ZONES),
    switchMap(action =>
      this.clientZonesService.getClientZones().pipe(
        map((payload) => {
          // this.notif.notify('info', 'get client zones', 'data ok ' + payload.count);
          return new ClientZonesActions.GetClientZonesSuccess(payload);
        }),
        catchError(err => {
          // this.notif.notify('error', 'Get client zones', err);
          return  of(new ClientZonesActions.GetClientZonesFail(err))
        })
      )
    )
  )


}
