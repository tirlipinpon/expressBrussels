import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../shared/appState';
import {GetCustomer} from "../actions/customer.actions";

@Injectable()
export class AlwaysAuthGuardService implements CanActivate {

  // constructor(private customerService: CustomerService) { }
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private store: Store<fromRoot.AppState>) { }

  canActivate() {
    // console.log('AlwaysAuthGuard');
    const resp1 = this.authenticationService.isToken();
    const resp2 = this.authenticationService.isTokenExpired();
    const resp3 = this.authenticationService.getDecodedTokenValid();
    if (resp1 && resp2 && resp3 === 1) {
      // this.authenticationService.setCustomerDecoded();
      const id = this.authenticationService.getDecodedTokenId();
      this.store.dispatch(new GetCustomer(id));
      return true;
    }
    // console.log('canActivate: ', false);
    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
