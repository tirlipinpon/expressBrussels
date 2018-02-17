import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {CustomerService} from "./customer.service";

@Injectable()
export class AlwaysAuthGuardService implements CanActivate {

  // constructor(private customerService: CustomerService) { }
  constructor(private router: Router) { }

  canActivate() {
    // console.log("AlwaysAuthGuard");
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }

}
