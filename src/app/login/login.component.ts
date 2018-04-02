import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import * as jwt_decode from 'jwt-decode';
import * as CustomerActions from '../actions/customer.actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../shared/appState';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb:FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private store: Store<fromRoot.AppState>
  ) {
    this.form = this.fb.group({
      email: ['test',Validators.required],
      password: ['test',Validators.required]
    });
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  setCustomerDecoded(data): void {
    let decoded = jwt_decode(data);
    this.store.dispatch(new CustomerActions.SetCustomer(decoded));
    console.log(decoded);
  }


  login() {
    const val = this.form.value;
    this.loading = true;
    if (val.email && val.password) {
      this.authenticationService.login(val)
        .subscribe(data => {
          console.log('LoginComponent data:', data);
          this. setCustomerDecoded(data);
          if (data && data !== 'error') {
            // console.log('LoginComponent login OK:', data);
            this.router.navigateByUrl('/menu');
            this.error = '';
            this.loading = false;
          }else{
            console.log('LoginComponent login KO:');
            this.error = 'error';
            this.loading = false;
          }
        });
    }


  }
}
