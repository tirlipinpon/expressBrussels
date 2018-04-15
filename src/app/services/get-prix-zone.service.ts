import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PrixZone} from "../models/prixZone";

@Injectable()
export class GetPrixZoneService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPrixZoneMoto(id: number): Observable<PrixZone> {
    console.log('in service get prix zone moto data :', id);
    let url = this.apiUrl + 'php//read_prix_zone_moto.php?id=' + id;
    return this.http.get(url)
      .catch(error => Observable.throw('error in service get client zones with message from server -> ', error));
  }
}
