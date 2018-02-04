import {Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {NotificationService} from "../../services/notification.service";
import * as RemovalActions  from '../../actions/removal.actions';
import * as fromRoot from "../../shared/appState";
import {DataForm} from "../../models/DataForm";
import * as moment from 'moment';

@Component({
  selector: 'app-removals',
  templateUrl: './removals.component.html',
  styleUrls: ['./removals.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemovalsComponent implements OnInit, OnDestroy {

  customerId = 1;
  removals$: Observable<DataForm[]>;
  formRemoval: FormGroup[] = [];

  constructor(private store: Store<fromRoot.AppState>,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private notificationsService: NotificationService) {
    this.storeDispatch();
  }
  ngOnInit() {
    this.storeSelect();
    this.formRemoval.push(this.createFormRemoval(null));
    this.initFormsRemoval();
    let now = moment(); // add this 2 of 4
    console.log('hello world', now.format()); // add this 3 of 4
  }
  ngOnDestroy() {  }
  storeDispatch() {
    //this.store.dispatch({type: CustomerActions.GET_CUSTOMER, payload: this.customerId });
    // this.store.dispatch(new OrderActions.InitOrder(this.customerId));
    this.store.dispatch(new RemovalActions.GetRemovals(this.customerId*10+1)); // (id + type)  eg: id = 69; type=1 fk_type=691
  }
  storeSelect() {
    this.removals$ = this.store.select(fromRoot.selectors.getRemovalsData);
  }
  initFormsRemoval(): void {
    this.removals$.subscribe(data => {
      this.cd.markForCheck();
      if(data.length ) {
        // init data
        if(this.formRemoval.length === 1) {
          data.forEach(elem => {
            this.formRemoval.push(this.createFormRemoval(elem));
            this.cd.markForCheck();
          });
        //  add data
        }else if(this.formRemoval.length-1 < data.length) {
          this.formRemoval.push(this.createFormRemoval(data[data.length-1]));
          this.cd.markForCheck();
        //  update data
        }else { }
        this.disableForm();
      }
    });
  }

  disableForm() {
    this.formRemoval.forEach(elem => {
      const ctrl = elem.controls;
      if(ctrl.active.value === '0') {
        ctrl.name.disable();
        ctrl.ref_client.disable();
        ctrl.address.disable();
        ctrl.number.disable();
        ctrl.cp.disable();
        ctrl.state.disable();
        ctrl.phone.disable();
        ctrl.phone.disable();
        ctrl.created.disable();
      }else if(ctrl.active.value === '1'){
        ctrl.name.enable();
        ctrl.ref_client.enable();
        ctrl.address.enable();
        ctrl.number.enable();
        ctrl.cp.enable();
        ctrl.state.enable();
        ctrl.phone.enable();
        ctrl.phone.enable();
        ctrl.created.enable();
      }
    });
    this.cd.markForCheck();
  }
  createFormRemoval(data?: DataForm): FormGroup {
    let active;
    if(!data){
      active = 1;
    }else{
      active = data.active;
    }
    return this.fb.group({
      id: [data ? data.id : ''],
      name: [data? data.name : '', Validators.required],
      ref_client: [data ? data.ref_client : ''],
      address: [data ? data.address : '', Validators.required],
      number: [data ? data.number : '', Validators.required],
      cp: [data? data.cp : '', Validators.required],
      state: [data? data.state : '', Validators.required],
      phone: [data ? data.phone : '', Validators.required],
      infos: this.fb.group({
        info1: [''],
        info2: [''],
      }),
      type: [data ? data.type : 1],
      fk_client: [data ? data.fk_client : this.customerId],
      active: [data ? active : 1],
      created: [data ? moment(data.created).format('DD-MM-YYYY') : ''],
      fk_type: [data ? data.fk_type : this.customerId+''+1],
    });
  }
  update(form: FormGroup): void {
    // console.log('form update:', form.value);
    this.store.dispatch(new RemovalActions.EditRemoval(form.value));
    form.markAsUntouched();
    form.markAsPristine();
  }
  delete(form: FormGroup): void {
    const activeValue =  form.get('active').value;
    if(activeValue === "1") {
      form.get('active').setValue("0");
      form.disable();
    }else if( activeValue === "0"){
      form.get('active').setValue("1");
      form.enable();
    }
    this.store.dispatch(new RemovalActions.DeleteRemoval(<DataForm>form.value));
  }

  add(form: FormGroup): void {
    this.store.dispatch(new RemovalActions.AddRemoval(form.value));
    this.formRemoval[0].reset();
    this.formRemoval[0].markAsUntouched();
    this.formRemoval[0].markAsPristine();
  }
}
