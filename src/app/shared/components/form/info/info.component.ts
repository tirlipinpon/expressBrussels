import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Contact} from "../../../../models/contact";

@Component({
  selector: 'app-info',
  templateUrl: 'info.component.html',
  styleUrls: ['info.component.css']
})
export class InfoComponent implements OnInit, OnChanges {
  @Input() formGroup: FormGroup;
  @Input('contact') contact: Contact[];
  contacts: Contact[];
  constructor() {}
  ngOnInit() {  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.contact.currentValue && changes.contact.currentValue.length) {
      this.contacts = changes.contact.currentValue;
    }

  }
}
