import {Injectable, NgZone} from '@angular/core';
import {MapsAPILoader} from "@agm/core";
import {Address} from "../../../models/address";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GetDistanceMatrixService {

  responseFromGoogle: any = null;


  constructor(    private mapsAPILoader: MapsAPILoader,
                  private ngZone: NgZone) { }

  googleMapDistanceMatrixService(origin: Address, dest: Address): any {
      return  this.mapsAPILoader.load()
        .then(
        () => {
           // return this.ngZone.run(() => {
            const origin1 = origin.address + ' ' + origin.number + ' ' + origin.cp + ', ' + origin.state;
            const destinationA = dest.address + ' ' + dest.number + ' ' + dest.cp + ', ' + dest.state;
            let service = new google.maps.DistanceMatrixService();
            let resp = service.getDistanceMatrix(
              {
                origins: [origin1],
                destinations: [destinationA],
                travelMode: google.maps.TravelMode.DRIVING
              }, this.callbackDistanceMatrixService);
          // });
          console.log('resp: ',resp);
        })
        .catch(this.handleError);
  }

  private handleError(error: any): any {
    console.error('An error occurred', error);
    return  error;
  }

  callbackDistanceMatrixService(response, status): any {
    // console.log('status: ', status);
    // console.log('response: ', response);
    // console.log('response elem: ', response.rows["0"].elements[0]);
    if( status === 'ok') {
      this.responseFromGoogle = response.rows["0"].elements[0];
    }else {
      this.responseFromGoogle = 'status not ok' + response;
    }
     return this.responseFromGoogle;
  }

}
