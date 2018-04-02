import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'
import {environment} from '../../environments/environment';
import * as moment from 'moment';
import {Observable} from 'rxjs/Observable';
import {Store} from "@ngrx/store";
import * as jwt_decode from 'jwt-decode';
import * as CustomerActions from '../actions/customer.actions';
import * as fromRoot from '../shared/appState';

export const TOKEN_NAME: string = 'jwt_token';
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     'Authorization': 'my-auth-token'
//   })
// };

@Injectable()
export class AuthenticationService {
  // public token: string;
  private apiUrl = environment.apiUrl;
  private token: string;

  constructor(private http: HttpClient, private store: Store<fromRoot.AppState>) {
    // // set token if saved in local storage
    // let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.token = currentUser && currentUser.token;
  }
  setCustomerDecoded(): void {
    let decoded = jwt_decode(this.getToken());
    this.store.dispatch(new CustomerActions.SetCustomer(decoded));
    // console.log(decoded);
  }
  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }
  setToken(token: string): void {
    console.log('setToken token:', token);
    localStorage.setItem(TOKEN_NAME, token);
  }
  public isToken(): boolean {
     if (this.getToken() && this.getToken().length) {
      return true;
    }else {
       return false
    }
  }

  public isLoggedIn() {
    const isBefore  = moment().isBefore(this.getExpiration());
    console.log(isBefore);
    return isBefore;
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;

    const date = this.getTokenExpirationDate();
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  getTokenExpirationDate(): Date {
    const expiration = localStorage.getItem('expires_at');
    if (expiration === undefined) return null;
    const date = new Date(0);
    const expiresAt = JSON.parse(expiration);
    date.setUTCSeconds(expiresAt);
    return date;
  }

  login(value): Observable<any> {
    let url = this.apiUrl + 'php//read_login.php';
    let data = value;
    // console.log('AuthenticationService url: ', url);
    // this is just the HTTP call,
    // we still need to handle the reception of the token
    // shareReplay: prevent the receiver of this Observable from accidentally triggering multiple POST requests due to multiple subscriptions.
    return this.http.post(url, data)
      .do(res => this.setSession(res))
      // .shareReplay()
      .catch(error => Observable.throw('error in service login  with message from server -> ', error));
  }
  private setSession(authResult) {
    if (authResult !== 'error') {
      // console.log('setSession:', authResult );
      const expiresAt = moment().add(authResult.expiresIn,'second');
      localStorage.setItem(TOKEN_NAME, authResult); // authResult.idToken);
      localStorage.setItem('expires_at', JSON.stringify('6054600'.valueOf()) ); // JSON.stringify(expiresAt.valueOf()) );
      const decoded = jwt_decode(this.getToken());
      // console.log(decoded);
    }
  }
  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }
}
