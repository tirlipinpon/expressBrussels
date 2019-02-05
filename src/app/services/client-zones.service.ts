
import {throwError as observableThrowError, Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {MyClientZonesState} from '../models/my-client-zones';
import {catchError} from "rxjs/internal/operators";

@Injectable()
export class ClientZonesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getClientZones(): Observable<MyClientZonesState> {
    // console.log('in service client zones');
    let url = this.apiUrl+'php//read_client_zones.php';
    return this.http.get<MyClientZonesState>(url).pipe(
  catchError(error => observableThrowError('error in service get client zones with message from server -> ', error))
    )
  }

}
