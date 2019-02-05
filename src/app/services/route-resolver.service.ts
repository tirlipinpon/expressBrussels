import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";


import {CustomerService} from "./customer.service";
import {map, first} from "rxjs/internal/operators";

@Injectable()
export class RouteResolverService implements Resolve<Observable<any>>{

  constructor(   private customerService: CustomerService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.customerService.currentCustomerId.pipe(
      map(id => {
        return id;
      }),
      first()
    )
  }
}
