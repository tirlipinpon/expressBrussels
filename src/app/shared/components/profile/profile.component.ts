import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {DataForm} from "../../../models/DataForm";
import {Observable} from "rxjs";
import {AppState} from "../../appState";
import {Store} from "@ngrx/store";
import * as CustomerActions  from '../../../actions/customer.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  display: boolean = false;
  customer$: Observable<DataForm>;
  formCustomer: FormGroup;

  customer: any;
  customerId = 1;
  datas: any;
  nameForm = ['customer'];

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.storeSelect();
    this.initFormsCustomer();
  }

  ngOnInit() {
    this.storeDispatch();
  }

  showDialog() {
    this.display = true;
  }

  storeSelect(){
    this.customer$ = this.store.select((s: AppState) => s.customer);
  }
  storeDispatch() {
    this.store.dispatch(new CustomerActions.GetCustomer(this.customerId));
  }

  onValueCustomerUpdated(data: DataForm): void {
    // console.log('on customer value  changed: ', data);
    this.store.dispatch(new CustomerActions.EditCustomer(data));
  }

  initFormsCustomer(): void {
    this.formCustomer = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', Validators.required],
      address: ['', Validators.required],
      number: ['', Validators.required],
      cp: ['', Validators.required],
      state: ['', Validators.required],
      phone: ['', Validators.required],
      infos: this.fb.group({
        info1: ['', { updateOn: 'blur', validators: [Validators.required]} ],
        info2: ['', { updateOn: 'blur', validators: [Validators.required]} ],
      }),
      type: ['', Validators.required],
      fk_client: ['', Validators.required],
      active: ['', Validators.required],
      created: ['', Validators.required],
      fk_type: [0, Validators.required]
    });
  }

}
