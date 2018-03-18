import {Injectable, NgZone} from '@angular/core';
import {MapsAPILoader} from "@agm/core";
import 'rxjs/add/operator/toPromise';
import {Address} from "../../models/address";


@Injectable()
export class GetDistanceMatrixService {

  constructor(    private mapsAPILoader: MapsAPILoader,
                  private ngZone: NgZone) { }

  googleMapDistanceMatrixService(origin: Address, dest: Address): Promise<any> {
      return  this.mapsAPILoader.load()
        .then(
        () => {
           // return this.ngZone.run(() => {
            const origin1 = origin.address + ' ' + origin.number + ' ' + origin.cp + ', ' + origin.state;
            const destinationA = dest.address + ' ' + dest.number + ' ' + dest.cp + ', ' + dest.state;
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
          // });

        })
        .catch(this.handleError);
  }

  private handleError(error: any): any {
    console.error('An error occurred', error);
    return  error;
  }

}
