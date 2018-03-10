import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AlwaysAuthGuardService implements CanActivate {

  // constructor(private customerService: CustomerService) { }
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate() {
    // console.log('AlwaysAuthGuard');
    if (this.authenticationService.getToken()) {
      // console.log('canActivate: ', true);
      // logged in so return true
      return true;
    }
    console.log('canActivate: ', false);
    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
