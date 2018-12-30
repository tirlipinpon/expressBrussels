import { Component, OnInit, ElementRef, ViewChild, NgZone, Input} from '@angular/core';
import { MapsAPILoader} from '@agm/core';
import {FormGroup} from "@angular/forms";
import {InputAutocompletionComponent} from "../input-completion/input-autocompletion.component";

@Component({
  selector: 'app-autocomplete-google',
  templateUrl: 'autocomplete-google.component.html',
  styleUrls: ['autocomplete-google.component.css']
})
export class AutocompleteGoogleComponent implements OnInit {

  @ViewChild('search') public searchElement: ElementRef;
  @Input('formGroup') formGroup: FormGroup;
  @Input('refInputAutoComplete') refInputAutoComplete: InputAutocompletionComponent;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit() {
    // console.log(this.formGroup)
    this.mapsAPILoader.load().then(
      () => {
        let options = {
          types: ['address'],
          componentRestrictions: {country: ['be','fr']}
        };
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, options);

        autocomplete.addListener('place_changed', () => {
            this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult =  autocomplete.getPlace();
            if (place.geometry === undefined || place.geometry === null) {
              console.log('address not exist:', place);
              return;
            }else {
              this.refInputAutoComplete.setSelectdedValue('state', place.vicinity);
              this.formGroup.patchValue({
                address: place.name,
                addressValidated: 1
              });
            }
          });
        });
      }
    )
  }

}
