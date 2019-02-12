import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {environment} from "../../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {map, catchError} from "rxjs/internal/operators";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = this.apiUrl+'php//upload_file.php';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData, { params:  new HttpParams().set('fk_customer_id', '163') }).pipe(
      map(() => { return true; }),
      catchError((e) =>  {
        console.log(e);
        return of(false);
      })
    );
  }
}
