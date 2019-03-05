import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {DataForm} from "../../../../models/DataForm";

@Component({
  selector: 'app-select-client',
  templateUrl: './select-client.component.html',
  styleUrls: ['./select-client.component.css']
})
export class SelectClientComponent implements OnInit {

  @Input() clients: DataForm[];
  @Output() selectedClient = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  selectClientById(value) {
    console.log(value);
    this.selectedClient.emit(value);
}

}
