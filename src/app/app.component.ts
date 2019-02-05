import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromRoot from './shared/appState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'app';
  customerId$: Observable<number>;

  constructor(private store: Store<fromRoot.AppState>) {
    this.customerId$ = this.store.select(fromRoot.selectors.getCustomerId)
  }

  ngOnInit() { }

}
