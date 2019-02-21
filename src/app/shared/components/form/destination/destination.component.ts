import {Component, OnInit, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {

  @Input() formDestination: FormGroup;

  constructor() { }

  ngOnInit() { }


}
