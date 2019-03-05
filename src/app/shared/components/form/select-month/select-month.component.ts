import {Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';

@Component({
  selector: 'app-select-month',
  templateUrl: './select-month.component.html',
  styleUrls: ['./select-month.component.css']
})
export class SelectMonthComponent implements OnInit, OnChanges {

  value: number;

  @Input() months: any;
  @Input() changeClient: number;

  @Output() selectedMonth = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes.changeClient) {
      console.log(changes);
      this.value = changes.changeClient.currentValue;
    }
  }
  selectOrdersByMonth(selectedValue: number): void {
    this.selectedMonth.emit(selectedValue);
  }
}
