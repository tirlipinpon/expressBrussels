import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAlwaysAuthGuardService implements CanActivate {

  // constructor(private customerService: CustomerService) { }
  constructor(private authenticationService: AuthenticationService) { }

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
