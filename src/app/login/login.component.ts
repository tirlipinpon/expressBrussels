import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

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
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
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
      this.authenticationService.login(val)
        .subscribe(data => {
          // console.log('LoginComponent data:', data);
          if (data && data !== 'error') {
            this.authenticationService.setCustomerDecoded();
            this.router.navigateByUrl('/menu');
            this.error = '';
            this.loading = false;
          }else{
            console.log('LoginComponent login KO:', data);
            this.error = 'error';
            this.loading = false;
          }
        });
    }


  }
}
