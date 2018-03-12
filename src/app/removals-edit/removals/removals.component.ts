import {
  Component, OnInit, OnDestroy, ChangeDetectorRef, HostListener
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {NotificationService} from '../../services/notification.service';
import * as actions  from '../../actions/removal.actions';
import * as fromRoot from '../../shared/appState';
import {DataForm} from '../../models/DataForm';
import * as moment from 'moment';
import {ConfirmationService} from 'primeng/components/common/confirmationservice';
import * as ClientZonesActions  from '../../actions/clientZones.actions';
import {MyClientZones} from '../../models/my-client-zones';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-removals',
  templateUrl: './removals.component.html',
  styleUrls: ['./removals.component.css'],
})
export class RemovalsComponent implements OnInit, OnDestroy {

  private customerId = 1;
  private typeDataForm = 1;
  storeData$: Observable<DataForm[]>;
  allFormGroup: FormGroup[] = [];
  clientZones$: Observable<MyClientZones[]>;
  clientZones: MyClientZones[];

  constructor(private store: Store<fromRoot.AppState>,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private confirmationService: ConfirmationService,
              private notificationsService: NotificationService) {
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
    this.store.dispatch(new actions.GetRemovals(this.customerId*10+1)); // (id + type)  eg: id = 69; type=1 fk_type=691
  }
  storeSelect() {
    // this.customerId$ = this.store.select(fromRoot.selectors.getCustomerId);
    // this.customerId$.subscribe(data => this.customerId = data );
    this.clientZones$ = this.store.select(fromRoot.selectors.getClientZonesData);
    this.clientZones$.subscribe(data => {
      this.clientZones = data;
    });
    this.storeData$ = this.store.select(fromRoot.selectors.getRemovalsData);
  }
  initFormsRemoval(): void {
    this.storeData$.subscribe(data => {
      this.cd.markForCheck();
      if (data.length ) {
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

  disableForm() {
    this.allFormGroup.forEach(elem => {
      const ctrl = elem.controls;
      if (ctrl.active.value === '0') {
        ctrl.name.disable();
        ctrl.ref_client.disable();
        ctrl.address.disable();
        ctrl.number.disable();
        ctrl.cp.disable();
        ctrl.state.disable();
        ctrl.phone.disable();
        ctrl.phone.disable();
        ctrl.created.disable();
      }else if (ctrl.active.value === '1'){
        ctrl.name.enable();
        ctrl.ref_client.enable();
        ctrl.address.enable();
        ctrl.number.enable();
        ctrl.cp.enable();
        ctrl.state.enable();
        ctrl.phone.enable();
        ctrl.phone.enable();
        ctrl.created.disable();
      }
    });
    this.cd.markForCheck();
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
      name: [data? data.name : '', Validators.required],
      ref_client: [data ? data.ref_client : ''],
      address: [data ? data.address : '', Validators.required],
      number: [data ? data.number : '', Validators.required],
      cp: [data? data.cp : '', Validators.required],
      state: [data? data.state : '', Validators.required],
      clientZone: [data? data.clientZone : ''],
      phone: [data ? data.phone : '', Validators.required],
      infos: this.fb.group({
        info1: [''],
        info2: [''],
      }),
      type: [data ? data.type : this.typeDataForm],
      fk_client: [data ? data.fk_client : this.customerId],
      active: [data ? active : 1],
      created: [data ? moment(data.created).format('DD-MM-YYYY') : ''],
      fk_type: [data ? data.fk_type : this.customerId+''+this.typeDataForm],
    });
  }
  update(form: FormGroup): void {

    this.store.dispatch(new actions.EditRemoval(form.value));
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
    this.store.dispatch(new actions.DeleteRemoval(<DataForm>form.value));
  }

  add(form: FormGroup): void {
    this.setClientZone(form);
    this.store.dispatch(new actions.AddRemoval(form.value));
    this.allFormGroup[0].reset();
    this.allFormGroup[0].markAsUntouched();
    this.allFormGroup[0].markAsPristine();
  }
  setClientZone(form: FormGroup) {
    const cp = form.get('cp').value;
    console.log('cp: ', cp);
    form.get('clientZone').setValue(1);
    console.log('clientZone:', form.get('clientZone').value);
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
