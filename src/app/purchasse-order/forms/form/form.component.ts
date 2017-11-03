import {
  Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild
} from '@angular/core';
import { FormGroup} from "@angular/forms";
import {DataForm} from "../../../models/DataForm";
import {Observable} from "rxjs/Observable";
import {InfoComponent} from "./info/info.component";

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {

  @Input('isCustomer') isCustomer: boolean;
  @Input('formGroup') formGroup: FormGroup;
  @Input('nameForm') nameForm: string;
  @Input('datas') set data(value: DataForm[]) {
    if (!!value) {
      if (this.isCustomer) {
        this._initData(value);
      }else{
        if(this._user.length == 0) {
          for(let i=0; i< Object.keys(value).length; i++){
            this._user.push(value[i]);
            console.log("this._user= ", this._user);
          }
        }

      }
    }
  }
  @Output() updateDataForm = new EventEmitter<FormGroup>();
  @Output() updateDataFormInfos = new EventEmitter<FormGroup>();
  // private
  private showDropDown = false;
  private _user: DataForm[] = [];
  private valueChanges$ = null;
  private valueChangesInfos$ = null;

  constructor() {}
  ngOnInit() {
    if(!this.isCustomer){
      this.onChanges();
    }
  }
  ngOnDestroy(){
    if(this.valueChanges$){
      this.valueChanges$.unsubscribe();
    }
    if(this.valueChangesInfos$){
      this.valueChangesInfos$.unsubscribe();
    }
  }

  private _initData(data): void {
    console.log("init data : ", data);
    this.formGroup.patchValue({
      id: data.id,
      name: data.name,
      address: data.address,
      number: data.number,
      cp: data.cp,
      state: data.state,
      phone: data.phone,
      infos: {
        info1: data.infos.info1,
        info2: data.infos.info2,
      },
      type: data.type,
      fk_client: data.fk_client,
      active: data.active,
      created: data.created,
      fk_type: data.fk_type
    });
  }

  // for customer
  saveDataCustomer(): void {
    console.log("-?- " + this.nameForm + ' button pushed for save data = ', this.formGroup.value);
    this.updateDataForm.emit(this.formGroup.value);
  }

  updateDataFormInfosFromChild(data){
    this.updateDataFormInfos.emit(data)
  }

  // not for customer
  onChanges(): void {
    this.valueChanges$ = this.formGroup.get('id').valueChanges.subscribe(val => {
      console.log("-?- " + this.nameForm +' selected  id = ', val);
      this.updateDataForm.emit(val);
    });
  }

  // auto completion
  toogleDropDown() {
    // console.log('toogleDropDown showDropDown = '+  this.showDropDown);
    this.showDropDown = !this.showDropDown;
  }
  getSearchValue() {
    return this.formGroup.value.name;
  }
  initSelectdedValue(value) {
    // this.formGroup.patchValue({"name":this.datas[value].name});
    // console.log('initSelectdedValue');
    this._initData(this.getByValue(value));
    this.toogleDropDown();
  }
  getByValue(value): DataForm {
    let arrayWithElem = this._user.filter(elem => elem.name === value);
    return arrayWithElem[0];
  }

}
