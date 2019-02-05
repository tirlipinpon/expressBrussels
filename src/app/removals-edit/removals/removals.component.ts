import {
  Component, OnInit, OnDestroy, ChangeDetectorRef, HostListener
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as actionsRemoval  from '../../actions/removal.actions';
import * as actionsRecipient  from '../../actions/recipient.actions';
import * as fromRoot from '../../shared/appState';
import {DataForm} from '../../models/DataForm';
import * as moment from 'moment';
import * as ClientZonesActions  from '../../actions/clientZones.actions';
import {MyClientZones} from '../../models/my-client-zones';


import {CustomerService} from "../../services/customer.service";
import {ActivatedRoute} from "@angular/router";
import {ValidatorDuplicateString} from "../../shared/validators/validators-conflict.directive";


@Component({
  selector: 'app-removals',
  templateUrl: './removals.component.html',
  styleUrls: ['./removals.component.css'],
})
export class RemovalsComponent implements OnInit, OnDestroy {

  private customerId: number;
  private typeDataForm: number;
  storeDataForm$: Observable<DataForm[]>;
  allFormGroup: FormGroup[] = [];
  clientZones$: Observable<MyClientZones[]>;
  clientZones: MyClientZones[];
  private witchComponent: string;


  constructor(private store: Store<fromRoot.AppState>,
              private fb: FormBuilder,
              private customerService: CustomerService,
              private cd: ChangeDetectorRef,
              private route: ActivatedRoute) {
    this.witchComponent = this.route.routeConfig.path;
    if (this.witchComponent === 'removals') {
      this.typeDataForm = 1; // diff
    }else{
      this.typeDataForm = 2; // diff
    }

    this.storeDispatch();
  }
  ngOnInit() {
    this.storeSelect();
    this.allFormGroup.push(this.createFormGroup(null));
    this.initFormsRemoval();
  }
  ngOnDestroy() {  }
  storeDispatch() {
    this.store.dispatch(new ClientZonesActions.GetClientZones());
    this.customerService.currentCustomerId.subscribe(id => {
      if (id !== 0) {
        this.customerId = id;
        if (this.witchComponent === 'removals') {
          this.store.dispatch(new actionsRemoval.GetRemovals(this.customerId*10+this.typeDataForm)); // (id + type)  eg: id = 69; type=1 fk_type=691
        }else if (this.witchComponent === 'recipients') {
          this.store.dispatch(new actionsRecipient.GetRecipients(this.customerId*10+this.typeDataForm)); // (id + type)  eg: id = 69; type=1 fk_type=691
        }
      }
    });
  }
  storeSelect() {
    if (this.witchComponent === 'removals') {
      this.storeDataForm$ = this.store.select(fromRoot.selectors.getRemovalsData); // diff
    }else if (this.witchComponent === 'recipients') {
      this.storeDataForm$ = this.store.select(fromRoot.selectors.getRecipientsData); // diff
    }

    this.clientZones$ = this.store.select(fromRoot.selectors.getClientZonesData);
    this.clientZones$.subscribe(data => {
      this.clientZones = data;
    });
  }
  initFormsRemoval(): void {
    this.storeDataForm$.subscribe(data => {
      this.cd.markForCheck(); // TODO: remove ?
      if (data && data.length ) {
        // init data
        if (this.allFormGroup.length === 1) {
          data.forEach(elem => {
            this.allFormGroup.push(this.createFormGroup(elem));
            this.cd.markForCheck();
          });
        //  add data
        }else if (this.allFormGroup.length-1 < data.length) {
          this.allFormGroup.push(this.createFormGroup(data[data.length-1]));
          this.cd.markForCheck();
        //  update data
        }else { }
        // this.disableForm();
      }
    });
  }


  createFormGroup(data?: DataForm): FormGroup {
    let active;
    if (!data){
      active = 1;
    }else{
      active = data.active;
    }
    return this.fb.group({
      id: [data ? data.id : ''],
      name: [data? data.name : '', [Validators.required, Validators.minLength(3) ], [ValidatorDuplicateString(this.storeDataForm$, 'name')] ],
      ref_client: [data ? data.ref_client : '', [Validators.minLength(4)], [ValidatorDuplicateString(this.storeDataForm$, 'ref_client')]],
      address: [data ? data.address : '', Validators.required],
      number: [data ? data.number : ''],
      cp: [data? data.cp : '', Validators.required],
      state: [data? data.state : '', Validators.required],
      addressValidated: [data? data.addressValidated : ''],
      clientZone: [data? data.clientZone : ''],
      phone: [data ? data.phone : ''],
      infos: this.fb.group({
        info1: [''],
        info2: [''],
      }),
      type: [data ? data.type : this.typeDataForm],
      fk_client: [data ? data.fk_client : this.customerId],
      active: [data ? active : 1],
      created: [{value: data ? moment(data.created).format('DD-MM-YYYY') : '', disabled: true}],
      fk_type: [data ? data.fk_type : this.customerId+''+this.typeDataForm],
    });
  }
  update(form: FormGroup): void {
    if (this.witchComponent === 'removals') {
      this.store.dispatch(new actionsRemoval.EditRemoval(form.value)); // diff
    }else if (this.witchComponent === 'recipients') {
      this.store.dispatch(new actionsRecipient.EditRecipient(form.value)); // diff
    }

    form.markAsUntouched();
    form.markAsPristine();
  }
  delete(form: FormGroup): void {
    const activeValue =  form.get('active').value;
    if (activeValue === '1') {
      form.get('active').setValue('0');
      form.disable();
      form.get('created').disable();
    }else if ( activeValue === '0'){
      form.get('active').setValue('1');
      form.enable();
      form.get('created').disable();
    }
    if (this.witchComponent === 'removals') {
      this.store.dispatch(new actionsRemoval.DeleteRemoval(<DataForm>form.value)); // diff
    }else if (this.witchComponent === 'recipients') {
      this.store.dispatch(new actionsRecipient.DeleteRecipient(<DataForm>form.value)); // diff
    }

  }
  add(form: FormGroup): void {
    if (this.witchComponent === 'removals') {
      this.store.dispatch(new actionsRemoval.AddRemoval(form.value)); // diff
    }else if (this.witchComponent === 'recipients') {
      this.store.dispatch(new actionsRecipient.AddRecipient(form.value)); // diff
    }
    this.allFormGroup[0].reset();
    this.allFormGroup[0].markAsUntouched();
    this.allFormGroup[0].markAsPristine();
  }

  @HostListener('window:beforeunload')
  canDeactivate(): boolean {
    let canDeactive = true;
    this.allFormGroup.forEach( form => {
      if (form.dirty && form.touched) {
        canDeactive = false;
      }
    });
    return canDeactive;
  }

}
