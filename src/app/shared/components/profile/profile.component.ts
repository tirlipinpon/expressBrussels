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
  }

  ngOnInit() {
    this.storeDispatch();

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
    this.customer$.subscribe(data => {
      this.initFormsCustomer(data);
      this.onValueCustomerChanged();
    })
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

  initFormsCustomer(data: DataForm): void {
    this.formCustomer = this.fb.group({
      id: [data['id'], [Validators.required]],
      name: [data['name'], Validators.required],
      ref_client: [''],
      address: [data['address'], Validators.required],
      number: [data['number'], Validators.required],
      cp: [data['cp'], Validators.required],
      state: [data['state'], Validators.required],
      phone: [data['phone'], Validators.required],
      infos: this.fb.group({
        info1: [data['infos.info1'], { updateOn: 'blur', validators: [Validators.required]} ],
        info2: [data['infos.info2'], { updateOn: 'blur', validators: [Validators.required]} ],
      }),
      type: [data['type'], Validators.required],
      fk_client: [data['fk_client'], Validators.required],
      active: [data['active'], Validators.required],
      created: [data['created'], Validators.required],
      fk_type: [10, Validators.required]
    });
  }

}
