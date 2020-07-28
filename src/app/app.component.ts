import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import * as fromRoot from './shared/appState';
import {AuthenticationService} from "./services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'app';
  customerId$: Observable<number>;

  constructor(private store: Store<fromRoot.AppState>,private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.setCustomerDecoded();
    this.customerId$ = this.store.pipe(select(fromRoot.selectors.getCustomerId));
  }

  goPlaces() {
    this.router.navigate(['/']).then(nav => {
      this.authenticationService.logout();
    }, err => {
      console.log(err); // when there's an error
    });
  }

}
