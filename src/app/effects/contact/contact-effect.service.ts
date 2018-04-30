import {Injectable} from '@angular/core';
import {Action, Store} from "@ngrx/store";
import {AppState} from "../../shared/appState";
import {Actions, Effect} from "@ngrx/effects";
import {NotificationService} from "../../services/notification.service";
import {ContactService} from "../../services/contact.service";
import {Observable} from "rxjs";
import * as ContactActions  from '../../actions/contact.actions';

@Injectable()
export class ContactEffectService {

  constructor(private store: Store<AppState>,
              private action$: Actions,
              private notif: NotificationService,
              private contactService: ContactService) {
  }

  @Effect() getContact: Observable<Action> = this.action$
    .ofType(ContactActions.GET_CONTACT)
    .withLatestFrom(  this.store.select('customer')  )
    .switchMap(([action, dataForm]) =>
      this.contactService.getContact(dataForm.id)
        .map((payload) => {
          this.notif.notify('info', 'get Recipients OK ', payload.count+'/total');
          return new ContactActions.GetContactSuccess(payload);
        })
        .catch(err => {
          this.notif.notify('error', 'get contact NOK ', err);
          return Observable.of(new ContactActions.GetContactFail(err))
        })
    );

}
