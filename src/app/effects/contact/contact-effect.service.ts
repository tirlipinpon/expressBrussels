import {Injectable} from '@angular/core';
import {Action, Store} from "@ngrx/store";
import {AppState} from "../../shared/appState";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {NotificationService} from "../../services/notification.service";
import {ContactService} from "../../services/contact.service";
import {Observable, of} from "rxjs";
import * as ContactActions  from '../../actions/contact.actions';
import {withLatestFrom, switchMap, map, catchError} from "rxjs/internal/operators";
import {AddContactSuccess} from "../../actions/contact.actions";
import {AddContactFail} from "../../actions/contact.actions";

@Injectable()
export class ContactEffectService {

  constructor(private store: Store<AppState>,
              private action$: Actions,
              private notif: NotificationService,
              private contactService: ContactService) {
  }

  @Effect() getContact = this.action$.pipe(
    ofType(ContactActions.GET_CONTACT),
    withLatestFrom(this.store.select('customer')),
    switchMap(([action, dataForm]) =>
      this.contactService.getContact(dataForm.id).pipe(
        map((payload) => {
          // this.notif.notify('info', 'get contact OK ', payload.count + '/total');
          return new ContactActions.GetContactSuccess(payload);
        }),
        catchError(err => {
          // this.notif.notify('error', 'get contact NOK ', err);
          return of(new ContactActions.GetContactFail(err))
        })
      )
    )
  );

  @Effect() addContacts = this.action$.pipe(
    ofType(ContactActions.ADD_CONTACTS),
    switchMap((data) =>
          this.contactService.addContacts(data).pipe(
            map((resp) => new AddContactSuccess()),
            catchError(err => {
              // this.notif.notify('error', 'add contact NOK ', err);
              return of(new AddContactFail(err))
            } )
          )
    )
  );

  @Effect() addContactsSuccess = this.action$.pipe(
    ofType(ContactActions.ADD_CONTACT_SUCCESS),
    map(() => new ContactActions.GetContact())
  )
}
