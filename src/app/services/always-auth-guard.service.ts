import { Injectable } from '@angular/core';
import {CanActivate} from "@angular/router";
import {CustomerService} from "./customer.service";

@Injectable()
export class AlwaysAuthGuardService implements CanActivate {

  constructor(private customerService: CustomerService) { }

  canActivate() {
    console.log("AlwaysAuthGuard");
    if (this.customerService.isLoggedIn()) {
      return true;
    } else {
      console.log("You don't have permission to view this page");
      return false;
    }
  }

}
