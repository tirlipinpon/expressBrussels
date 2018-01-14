import {Component, OnInit, OnDestroy} from '@angular/core';
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
  styleUrls: ['./removals.component.css']
})
export class RemovalsComponent implements OnInit, OnDestroy {

  customerId = 1;
  removals$: Observable<DataForm[]>;
  formRemoval: FormGroup[] = [];

  constructor(private store: Store<fromRoot.AppState>,
              private fb: FormBuilder,
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
      // console.log('data: ', data);
      if(data.length && this.formRemoval.length===1) {
        data.forEach(elem => {
          this.formRemoval.push(this.initData(elem));
          });
        console.log('this.formRemova:', this.formRemoval);
      }

    })
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
  add(form: FormGroup): void{
    // const val = {
    //   id: null,
    //   active   :   1,
    //   address    :        "removal 1 addr ",
    //   cp        :        1040,
    //   created        :        null,
    //   fk_client        :        1,
    //   fk_type        :        11,
    //   infos        :
    //     {info1: "", info2: ""},
    //   name        :        "removal1",
    //   number        :        "83",
    //   phone        :        "0472475507",
    //   ref_client        :        "21remove",
    //   state        :        "Etterbeek",
    //   type        :        1
    // };
    this.store.dispatch(new RemovalActions.AddRemoval(form.value));
  }

}
