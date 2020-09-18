import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../shared/appState";
import {Observable} from "rxjs";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  customerId$: Observable<number>;

  constructor(private store: Store<fromRoot.AppState>, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.customerId$ = this.store.pipe(select(fromRoot.selectors.getCustomerId));
  }
  goPlaces() {
    this.router.navigate(['/']).then(nav => {
      this.authenticationService.logout();
    }, err => {
      console.log(err) // when there's an error
    });
  }
}
