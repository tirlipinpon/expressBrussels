import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {DataForm} from "../models/DataForm";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  model: any = {
    mail: 'test',
    password: 'test'
  };
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
    ) {}

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    // this.router.navigate(['/']);
    this.authenticationService.login(this.model.mail, this.model.password)
      .subscribe(result => {
        if (result === true) {
          // login successful
          this.router.navigate(['/']);
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }
}
