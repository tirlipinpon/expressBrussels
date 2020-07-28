import {Component, OnInit, ViewEncapsulation, OnDestroy, HostListener} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {DataForm} from '../../../models/DataForm';
import {Observable, Subject, Subscription} from 'rxjs';
import * as fromRoot from '../../appState';
import {Store} from '@ngrx/store';
import * as CustomerActions from '../../../actions/customer.actions';
import {CustomerService} from "../../../services/customer.service";
import {debounceTime, distinctUntilChanged} from "rxjs/internal/operators";

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
  private registered = false;

  customer: any;
  customerId: number;
  datas: any;
  nameForm = ['customer'];
  private sub$: Subscription;
  private subscriptions = [];

  constructor (private store: Store<fromRoot.AppState>,
              private customerService: CustomerService,
              private fb: FormBuilder) {
    this.storeSelect();
  }

  ngOnInit() {
    this.storeDispatch();

  }
  ngOnDestroy(): void {
    if (this.subscriptions.length) {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
  }

  showDialog() {
    this.display = true;
  }

  storeSelect(){
    this.customer$ = this.store.select(fromRoot.selectors.getCustomer);
    this.sub$ = this.customer$.pipe(distinctUntilChanged()).subscribe(data => {
      if (data && +data.id !== 0) {
        if (!this.registered) {
          this.registered = true;
          this.initFormsCustomer(data);
          this.onValueCustomerChanged();
        }
      }
    });
    this.subscriptions.push(this.sub$);
  }
  onValueCustomerChanged() {
    this.sub$ = this.formCustomer.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(val => {
      if (val) {
        this.store.dispatch(new CustomerActions.EditCustomer(val));
      }
    });
      this.subscriptions.push(this.sub$);
  }
  storeDispatch() {
    // this.store.dispatch(new CustomerActions.GetCustomer(1));
    this.sub$ = this.customerService.currentCustomerId.subscribe(id => {
      if(+id !== 0) {
        this.customerId = id;
      }
    });
      this.subscriptions.push(this.sub$);
  }

  saveCustomer(): void {
    // console.log('on customer value  changed: ', data);
    this.store.dispatch(new CustomerActions.SaveCustomer());
  }

  initFormsCustomer(data: DataForm): void {
    this.formCustomer = this.fb.group({
      id: [data['id']],
      name: [data['name'], Validators.required],
      ref_client: [''],
      address: [data['address'], Validators.required],
      number: [data['number'], Validators.required],
      cp: [data['cp'], Validators.required],
      state: [data['state'], Validators.required],
      addressValidated: [1],
      phone: [data['phone'], Validators.required],
      infos: this.fb.group({
        info1: [data['infos']['info1'] ],
        info2: [data['infos']['info2'] ],
      }),
      type: [data['type']],
      fk_client: [data['fk_client']],
      active: [data['active']],
      created: [data['created']],
      fk_type: [10]
    });
  }

  @HostListener('window:beforeunload')
  canDeactivate(): boolean {
    let canDeactive = true;
    if (this.formCustomer.dirty && this.formCustomer.touched) {
        canDeactive = false;
      }
    return canDeactive;
  }

  // onBeforeDialogHide(event){
  //   console.log("Just before the dialog is closing");
  //   if (event.target.className === "ng-tns-c5-0 ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all ng-star-inserted") {
  //     event.preventDefault();
  //     return false;
  //   }
  // }
}
