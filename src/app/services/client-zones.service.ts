import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MyClientZones, MyClientZonesState} from "../models/my-client-zones";

@Injectable()
export class ClientZonesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getClientZones(): Observable<MyClientZonesState> {
    // console.log('in service client zones');
    let url = this.apiUrl+'php//read_client_zones.php';
    return this.http.get(url)
      .catch(error => Observable.throw('error in service get client zones with message from server -> ', error));
  }

}
