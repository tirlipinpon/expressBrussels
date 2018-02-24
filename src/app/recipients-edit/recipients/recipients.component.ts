import {Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {NotificationService} from '../../services/notification.service';
import * as actions  from '../../actions/recipient.actions';
import * as fromRoot from '../../shared/appState';
import {DataForm} from '../../models/DataForm';
import * as moment from 'moment';

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipientsComponent implements OnInit, OnDestroy {

  private customerId = 1;
  private typeDataForm = 2;
  storeData$: Observable<DataForm[]>;
  customerId$: Observable<number>;
  formGroupAr: FormGroup[] = [];

  constructor(private store: Store<fromRoot.AppState>,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private notificationsService: NotificationService) {
    this.storeDispatch();
  }
  ngOnInit() {
    this.storeSelect();
    this.formGroupAr.push(this.createFormGroup(null));
    this.initFormsRemoval();
  }
  ngOnDestroy() {  }
  storeDispatch() {
    this.store.dispatch(new actions.GetRecipients(this.customerId*10+2)); // (id + type)  eg: id = 69; type=1 fk_type=691
  }
  storeSelect() {
    // this.customerId$ = this.store.select(fromRoot.selectors.getCustomerId);
    // this.customerId$.subscribe(data => this.customerId = data );
    this.storeData$ = this.store.select(fromRoot.selectors.getRecipientsData);
  }
  initFormsRemoval(): void {
    this.storeData$.subscribe(data => {
      this.cd.markForCheck();
      if(data.length ) {
        // init data
        if(this.formGroupAr.length === 1) {
          data.forEach(elem => {
            this.formGroupAr.push(this.createFormGroup(elem));
            this.cd.markForCheck();
          });
          //  add data
        }else if(this.formGroupAr.length-1 < data.length) {
          this.formGroupAr.push(this.createFormGroup(data[data.length-1]));
          this.cd.markForCheck();
          //  update data
        }else { }
        this.disableForm();
      }
    });
  }

  disableForm() {
    this.formGroupAr.forEach(elem => {
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
        ctrl.created.disable();
      }
    });
    this.cd.markForCheck();
  }
  createFormGroup(data?: DataForm): FormGroup {
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
      type: [data ? data.type : this.typeDataForm],
      fk_client: [data ? data.fk_client : this.customerId],
      active: [data ? active : 1],
      created: [data ? moment(data.created).format('DD-MM-YYYY') : ''],
      fk_type: [data ? data.fk_type : this.customerId+''+this.typeDataForm],
    });
  }
  update(form: FormGroup): void {

    this.store.dispatch(new actions.EditRecipient(form.value));
    form.markAsUntouched();
    form.markAsPristine();
  }
  delete(form: FormGroup): void {
    const activeValue =  form.get('active').value;
    if(activeValue === '1') {
      form.get('active').setValue('0');
      form.disable();
      form.get('created').disable();
    }else if( activeValue === '0'){
      form.get('active').setValue('1');
      form.enable();
      form.get('created').disable();
    }
    this.store.dispatch(new actions.DeleteRecipient(<DataForm>form.value));
  }

  add(form: FormGroup): void {
    this.store.dispatch(new actions.AddRecipient(form.value));
    this.formGroupAr[0].reset();
    this.formGroupAr[0].markAsUntouched();
    this.formGroupAr[0].markAsPristine();
  }

}
