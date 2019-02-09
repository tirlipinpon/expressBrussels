import { Injectable } from '@angular/core';
import {PrixZone,  MyPrixZonesState} from "../../../models/prixZone";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PrixZoneService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getItems(table: string): Observable<MyPrixZonesState> {
    let url = this.apiUrl+'php//read_all_prix_zone.php';
    return  this.http.get<MyPrixZonesState>(url, { params:  new HttpParams().set('table', table) });
  }
  addItem(payload: {id_client: number, type: string}): Observable<PrixZone> {
    let url = this.apiUrl+'php//add_prix_zone.php';
    return this.http.post<PrixZone>(url, payload);
  }
  updateItem(client: PrixZone, type: string): Observable<PrixZone> {
    // return of(DUMMY_CLIENTS);
    let url = this.apiUrl+'php//update_prix_zone.php';
    return this.http.post<PrixZone>(url, client, { params:  new HttpParams().set('table', type) });
  }
}
