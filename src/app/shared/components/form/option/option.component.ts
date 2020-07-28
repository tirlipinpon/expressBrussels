import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-option',
  templateUrl: 'option.component.html',
  styleUrls: ['option.component.css']
})
export class OptionComponent implements OnInit, OnDestroy {

  @Input('formGroup') formGroup: FormGroup;
  @Output() updateDataForm: EventEmitter<string> = new EventEmitter<string>();
  optionsSpeed: string[] = ['express', 'double_express', 'go_and_back'];
  optionsType: string[] = ['moto', 'voiture'];
  optionsIcones: string[] = ['motorcycle', 'car'];
  private sub$: Subscription;
  private subscriptions = [];

  constructor() {}

  ngOnInit() {
    this.sub$ = this.formGroup.valueChanges.subscribe(() => {
      this.updateDataForm.emit('option');
    });
    this.subscriptions.push(this.sub$);
  }
  ngOnDestroy(): void {
    if (this.subscriptions.length) {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
  }


}
