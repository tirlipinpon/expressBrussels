
import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



import { ImportExport } from '../models/import-export';
import { environment } from '../../environments/environment';
import { catchError } from "rxjs/internal/operators";

@Injectable()
export class OrderIEService {

    constructor(private http: HttpClient) { }

    private apiUrl = environment.apiUrl;

    getOrders(data): Observable<ImportExport[]> {
        // console.log('in order service get orders from db with this id_customer->', data.payload);
        let url = this.apiUrl + 'php//read_all_ie_orders_by_client_id.php?fk_client_id=' + data.payload;
        return this.http.get<ImportExport[]>(url).pipe(
            catchError(error => observableThrowError('error in service get orders with message from server -> ' + error))
        )
    }

}
