import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {DataDataFormState} from '../models/DataForm';
import { environment } from '../../environments/environment';

@Injectable()
export class RemovalService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRemovals(data): Observable<DataDataFormState> {
    // console.log('fk_type from service: ', data.payload);
    let url = this.apiUrl+'php//read.php?fk_type='+data.payload;
    return  this.http.get(url).catch(error => Observable.throw('error in service get removals with message from server -> '+ error));
  }

  setRemoval(data): Observable<any> {
    // console.log('in removal service set new removal to db with this data-> ', data.payload);
    let url = this.apiUrl+'php//update.php';
    return this.http.post(url,data.payload);
  }

  addRemoval(data): Observable<any> {
    // console.log('in removal service set new removal to db with this data-> ', data.payload);
    let url = this.apiUrl+'php//add.php';
    return this.http.post(url,data.payload);
  }


}
