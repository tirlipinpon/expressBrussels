import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import {DataForm} from "../models/DataForm";
import * as AllActions  from '../actions/purchasseOrder.actions';
import {dataformInitCustomer} from "../reducers/purchasseOrder.reducer";
import {of} from "rxjs/observable/of";
export type Action = AllActions.All;

@Injectable()
export class ServiceService {

  datasForm: AngularFirestoreCollection<DataForm>;
  idClient = '1';
  currentId = 1;
  nameType = ['customer','removal','recipient'];


  dataformInitCustomer: DataForm =  {
  id: 0,
  name: 'init',
  address: 'aaa',
  number: 'aaa',
  cp: 0,
  state: 'aaa',
  phone: 'aaa',
  info1: 'aaa',
  info2: 'aaa',
  typeForm: 0,
  fk_client: 'aaa',
  active: false,
};

  constructor(private afs: AngularFirestore, private actions: Actions) {  }

  @Effect()
  getCustomer: Observable<Action> = this.actions
    .ofType(AllActions.GET_CUSTOMER)
    .map((payload) => {
      this.getDataFormByType(0).subscribe(data => {
        new AllActions.EditCustomer(data[0]);
      });
      return new AllActions.ValidCustomer(this.dataformInitCustomer);
    });

  @Effect()
  setCustomer: Observable<Action> = this.actions
    .ofType(AllActions.EDIT_CUSTOMER)
    .map((action: AllActions.EditCustomer) => {
      // console.log("----------payload: ", action.payload);
      this.updateCustomer(action.payload);
      return new AllActions.ValidCustomer(this.dataformInitCustomer);
    });

  getDataFormByType(type): Observable<DataForm[]> {
    let criteria = this.idClient+type;
    this.datasForm = this.afs.collection('dataForm', ref => {
      // Compose a query using multiple .where() methods
      return ref
        .where('fk_client', '==', criteria)
    });
    // console.log("getDataFormByType: ",this.datasForm.valueChanges() );
    return  this.datasForm.valueChanges();
  }

  updateCustomer(data) {
    // console.log('service change customer: ', data);
    this.afs.collection('dataForm').doc('customer1').update({
      active: true,
      address: data.address,
      cp: data.cp,
      fk_client: data.fk_client,
      id: 1,
      info1: data.info1,
      info2: data.info2,
      name: data.name,
      number: data.number,
      phone: data.phone,
      state: data.state,
      type: 0
    });
}

  addDataForm(type,id) {
    this.currentId = id;
    this.afs.collection('dataForm').doc(this.nameType[type]+this.currentId).set({
      active: true,
      address: "ad"+this.currentId,
      cp: 1060,
      fk_client: this.idClient+type,
      id: this.currentId,
      info1: "contact"+this.currentId,
      info2: "message"+this.currentId,
      name: "name"+this.currentId,
      number: "number"+this.currentId,
      phone: "0755055",
      state: "saint-gilles"+this.currentId,
      type: type
    })
  }

}
