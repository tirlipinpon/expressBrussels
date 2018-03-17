import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MyClientZones} from "../../../../models/my-client-zones";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddressComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input('data') clientZones: MyClientZones[];

  constructor() { }

  ngOnInit() {
  }

}
