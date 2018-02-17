import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import 'rxjs/add/operator/map'
import {environment} from "../../environments/environment";


@Injectable()
export class AuthenticationService {
  public token: string;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    // set token if saved in local storage
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string): Observable<boolean> {
    let url = this.apiUrl+'php//read_login.php?username='+username+'&password='+password;
    console.log('AuthenticationService url: ', url);
    return this.http.post(url)
      .map((response) => {
      console.log('AuthenticationService response: ', response);
        // login successful if there's a jwt token in the response
        let token =  response.id;
        if (token) {
          // set token property
          this.token = token;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
