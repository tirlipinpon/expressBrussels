import {Component, OnInit, ViewEncapsulation, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {DataForm} from '../../../models/DataForm';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../../appState';
import {Store} from '@ngrx/store';
import * as CustomerActions from '../../../actions/customer.actions';
import {CustomerService} from "../../../services/customer.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  display: boolean = false;
  customer$: Observable<DataForm>;
  formCustomer: FormGroup;
  private formValueChanges$;

  customer: any;
  customerId: number;
  datas: any;
  nameForm = ['customer'];

  constructor (private store: Store<fromRoot.AppState>,
              private customerService: CustomerService,
              private fb: FormBuilder) {
    this.storeSelect();
    this.initFormsCustomer();
  }

  ngOnInit() {
    this.storeDispatch();
    this.onValueCustomerChanged();
  }
  ngOnDestroy() {
    this.formValueChanges$.unsubscribe();
  }

  onValueCustomerChanged() {
    this.formValueChanges$ = this.formCustomer.valueChanges.subscribe(val => {
      this.store.dispatch(new CustomerActions.EditCustomer(val));
    });
  }

  showDialog() {
    this.display = true;
  }

  storeSelect(){
    this.customer$ = this.store.select(fromRoot.selectors.getCustomer);
  }
  storeDispatch() {
    // this.store.dispatch(new CustomerActions.GetCustomer(1));
    this.customerService.currentCustomerId.subscribe(id => {
      if(id !== 0) {
        this.customerId = id;
      }
    });
  }

  saveCustomer(): void {
    // console.log('on customer value  changed: ', data);
    this.store.dispatch(new CustomerActions.SaveCustomer());
  }

  initFormsCustomer(): void {
    this.formCustomer = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', Validators.required],
      ref_client: [''],
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
