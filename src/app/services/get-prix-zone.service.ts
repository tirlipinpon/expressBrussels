
import {throwError as observableThrowError, Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PrixZone} from "../models/prixZone";
import {catchError} from "rxjs/internal/operators";

@Injectable()
export class GetPrixZoneService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPrixZoneByType(obj: {id: number, table: string}): Observable<PrixZone> {
    // console.log('in service get prix zone '+obj['table'] +' obj :', obj);
    let url = this.apiUrl + 'php//read_prix_zone.php?id='+obj['id']+'&table='+obj['table'];
    return this.http.get<PrixZone>(url).pipe(
        catchError(error => observableThrowError('error in service get client zones with message from server -> ', error))
    )
  }
}
