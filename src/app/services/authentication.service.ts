import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'
import {environment} from '../../environments/environment';
// import * as jwt_decode from 'jwt-decode';
import jwt_decode from 'jwt-decode'
import * as moment from 'moment';
import {Observable} from 'rxjs/Observable';

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

  // private url: string = environment.apiUrl;
  // private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {
    // // set token if saved in local storage
    // let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.token = currentUser && currentUser.token;
  }
  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }
  setToken(token: string): void {
    console.log('setToken token:', token);
    localStorage.setItem(TOKEN_NAME, token);
  }
  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(this.getToken());
    if (decoded.exp === undefined) return null;
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;
    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }
  isLoggedOut() {
    return !this.isLoggedIn();
  }
  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  login(value): Observable<any> {
    let url = this.apiUrl + 'php//read_login.php';
    let data = value;
    console.log('AuthenticationService url: ', url);
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
      console.log('setSession:', authResult );
      const expiresAt = moment().add(authResult.expiresIn,'second');
      localStorage.setItem(TOKEN_NAME, authResult); // authResult.idToken);
      localStorage.setItem('expires_at', JSON.stringify('1504699256'.valueOf()) ); // JSON.stringify(expiresAt.valueOf()) );
      const decoded = jwt_decode(this.getToken());
      console.log(decoded);
    }
  }
  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }
}
