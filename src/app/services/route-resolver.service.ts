import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {CustomerService} from "./customer.service";
import {Store} from "@ngrx/store";
import * as fromRoot from '../shared/appState';

@Injectable()
export class RouteResolverService implements Resolve<Observable<any>>{

  private customerId: number;

  constructor(   private customerService: CustomerService,
                 private store: Store<fromRoot.AppState>,) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.customerService.currentCustomerId
      .map(id => {
        return id;
      })
      .first();

  }



}
