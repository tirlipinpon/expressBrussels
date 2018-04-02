import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
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
    if (this.authenticationService.isToken() && this.authenticationService.isTokenExpired()) {
      this.authenticationService.setCustomerDecoded();
      return true;
    }
    console.log('canActivate: ', false);
    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
