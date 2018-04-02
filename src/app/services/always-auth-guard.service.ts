import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import * as jwt_decode from 'jwt-decode';
import * as CustomerActions from '../actions/customer.actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../shared/appState';

@Injectable()
export class AlwaysAuthGuardService implements CanActivate {

  // constructor(private customerService: CustomerService) { }
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private store: Store<fromRoot.AppState>) { }

  canActivate() {
    // console.log('AlwaysAuthGuard');
    if (this.authenticationService.getToken()) { // TODO: use isLoggedIn()
      const decoded = jwt_decode(this.authenticationService.getToken());
      this.store.dispatch(new CustomerActions.SetCustomer(decoded));
      return true;
    }
    console.log('canActivate: ', false);
    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
