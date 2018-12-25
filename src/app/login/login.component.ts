import {Component, OnInit, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {SendCustomerEmail} from "../actions/customer.actions";
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
  respAuthService$: Observable<any>;
  isforgotProcess: boolean;

  typeInput = 'password';

  constructor(
    private store: Store<fromRoot.AppState>,
    private fb:FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
    this.isforgotProcess = false;
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {
    const val = this.form.value;
    this.loading = true;
    if (val.email && val.password) {
      this.respAuthService$ = this.authenticationService.login(val);
      this.respAuthService$.subscribe(data => {
          // console.log('LoginComponent data:', data);
          if (data && (data !== 'error' && data != 'e')) {
            this.authenticationService.setCustomerDecoded();
            this.router.navigateByUrl('/menu');
            this.error = '';
            this.loading = false;
          }else{
            console.log('LoginComponent login KO:', data);
            this.error = 'Erreur lors de la connexion veuillez verfier les données.';
            this.cdr.markForCheck();
            this.loading = false;
          }
        });
    }
  }
  forgotProcess() {
    this.isforgotProcess = !this.isforgotProcess;
  }
  changeTypeInputText() {
    this.typeInput = 'text';
    console.log(this.typeInput);
  }
  changeTypeInputPassword() {
    this.typeInput = 'password';
    console.log(this.typeInput);
  }
  sendEmail() {
    if (this.form.get('email').value && this.form.get('email').value.length > 0)
    this.store.dispatch(new SendCustomerEmail(this.form.get('email').value));
    this.forgotProcess();
  }
}
