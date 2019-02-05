import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Contact} from "../../../../models/contact";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-info',
  templateUrl: 'info.component.html',
  styleUrls: ['info.component.css']
})
export class InfoComponent implements OnInit, OnChanges {
  @Input() formGroup: FormGroup;
  @Input('contact') contact: Contact[];
  filteredContact: Observable<string[]>;

  constructor() {
    this.contact = [];
  }
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.contact && changes.contact.currentValue && changes.contact.currentValue.length) {
      this.contact =  changes.contact.currentValue;
    }
    if (changes.formGroup && changes.formGroup.currentValue) {
      this.formGroup  = changes.formGroup.currentValue;
    }
    this.filteredContact = this.formGroup.get('info1').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: any, target?: string): any[] {
    const filterValue = value.toLowerCase();
    if (!this.contact) return;
    return this.contact.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
