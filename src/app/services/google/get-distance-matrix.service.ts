import {Injectable, NgZone} from '@angular/core';
import {MapsAPILoader} from "@agm/core";
import 'rxjs/add/operator/toPromise';
import {Address} from "../../models/address";


@Injectable()
export class GetDistanceMatrixService {

  constructor(    private mapsAPILoader: MapsAPILoader,
                  private ngZone: NgZone) { }

  googleMapDistanceMatrixService(orig: Address, destB: Address): Promise<any> {
      return  this.mapsAPILoader.load()
        .then( () => {
           // return this.ngZone.run(() => {
            const origin1 = orig.address + ' ' + orig.number + ' ' + orig.cp + ', ' + orig.state + ', ' + orig.country;
            const destinationA = destB.address + ' ' + destB.number + ' ' + destB.cp + ', ' + destB.state + ', ' + destB.country;
            let service = new google.maps.DistanceMatrixService();

             return new Promise((resolve, reject) => {
               service.getDistanceMatrix(
                 {
                   origins: [origin1],
                   destinations: [destinationA],
                   travelMode: google.maps.TravelMode.DRIVING
                 }, (response, status) => {
                   // console.log(status);
                   //   resolve({ distance: response });
                   if(status === google.maps.DistanceMatrixStatus.OK) {
                     resolve({ distance: response });
                   }
                   // else {
                   //   reject(new Error('Not OK'));
                   // }
                 }
               );
             });

        })
        .catch(this.handleError);
  }

  private handleError(error: any): any {
    console.error('An error occurred', error);
    return  error;
  }

}
