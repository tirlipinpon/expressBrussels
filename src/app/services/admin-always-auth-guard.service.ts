import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {Store, select} from '@ngrx/store';
import * as fromRoot from '../shared/appState';

@Injectable({
  providedIn: 'root',
})
export class AdminAlwaysAuthGuardService implements CanActivate {

  // constructor(private customerService: CustomerService) { }
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private store: Store<fromRoot.AppState>) { }

  canActivate() {
      // this.authenticationService.setCustomerDecoded();
      const id = this.authenticationService.getDecodedTokenId();
      if (+id < 3) {
        return true;
      }else {
        return false;
      }

  }
}
