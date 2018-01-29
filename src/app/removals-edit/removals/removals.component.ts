import {Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

import {NotificationService} from "../../services/notification.service";
import * as RemovalActions  from '../../actions/removal.actions';
import * as fromRoot from "../../shared/appState";

import {DataForm} from "../../models/DataForm";

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
    this.initFormsRemoval();
    this.formRemoval.push(this.createFormRemoval());
  }
  ngOnDestroy() {
  }
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
        // premiere inittialisation des données
        if(this.formRemoval.length === 1) {
          data.forEach(elem => {
            this.formRemoval.push(this.initData(elem));
          });
        //  ajout de données suplementaires
        }else if(this.formRemoval.length > 1) {
          this.formRemoval.push(this.initData(data[data.length-1]));
          this.cd.markForCheck();
        }
      }
    });
    this.cd.markForCheck();
  }

  createFormRemoval(): FormGroup {
    return this.fb.group({
      id: [''],
      name: ['', Validators.required],
      ref_client: [''],
      address: ['', Validators.required],
      number: ['', Validators.required],
      cp: ['', Validators.required],
      state: ['', Validators.required],
      phone: ['', Validators.required],
      infos: this.fb.group({
        info1: [''],
        info2: [''],
      }),
      type: [1, Validators.required],
      fk_client: [1],
      active: [1],
      created: [''],
      fk_type: [11],
    });
  }
  initData(data): FormGroup {
    // console.log("init data : ", data);
    let formGroup = this.createFormRemoval();
    formGroup.patchValue({
      id: data.id,
      name: data.name,
      ref_client:  data.ref_client,
      address: data.address,
      number: data.number,
      cp: data.cp,
      state: data.state,
      phone: data.phone,
      type: data.type,
      fk_client: data.fk_client,
      active: data.active,
      created: data.created,
      fk_type: data.fk_type
    });
    return formGroup;
  }
  update(form: FormGroup): void {
    // console.log('form update:', form.value);
    this.store.dispatch(new RemovalActions.EditRemoval(form.value));
    form.markAsUntouched();
    form.markAsPristine();
  }
  add(form: FormGroup): void {
    this.store.dispatch(new RemovalActions.AddRemoval(form.value));
    this.formRemoval[0].reset();
    this.formRemoval[0].markAsUntouched();
    this.formRemoval[0].markAsPristine();
  }

}
