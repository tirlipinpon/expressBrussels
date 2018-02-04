import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {DataForm, DataDataFormState} from "../models/DataForm";

@Injectable()
export class RemovalService {

  constructor(private http: HttpClient) { }

  getRemovals(data): Observable<DataDataFormState> {
    // console.log('fk_type from service: ', data.payload);
    let url = 'http://localhost/expressDB/php//read.php?fk_type='+data.payload;
    return  this.http.get(url).catch(error => Observable.throw('error in service get removals with message from server -> '+ error));
  }

  setRemoval(data): Observable<any> {
    // console.log('in removal service set new removal to db with this data-> ', data.payload);
    let url = 'http://localhost/expressDB/php//update.php';
    return this.http.post(url,data.payload);
  }

  addRemoval(data): Observable<any> {
    // console.log('in removal service set new removal to db with this data-> ', data.payload);
    let url = 'http://localhost/expressDB/php//add.php';
    return this.http.post(url,data.payload);
  }


}
