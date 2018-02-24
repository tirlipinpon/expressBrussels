import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from "@angular/router";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  error = '';
  TOKEN_NAME: string = 'jwt_token';


  constructor(
    private fb:FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
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

  login() {
    const val = this.form.value;
    this.loading = true;
    if (val.email && val.password) {
      this.authenticationService.login(val.email, val.password)
        .subscribe(data => {
          if (data) {
            console.log('LoginComponent login OK:', data);
            this.router.navigateByUrl('/');
            this.error = '';
          }else{
            console.log('LoginComponent login KO:');
            this.error = 'error';
          }
        });
    }


  }
}
