import {Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataForm} from "../../../models/DataForm";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {

  @Input('datas') datas: any;
  @Input('isCustomer') isCustomer: any;
  @Output() updateDataForm = new EventEmitter<FormGroup>();
  formGroup :FormGroup;
  showDropDown = false;

  constructor(private fb: FormBuilder) {
    this.initForms();
  }

  ngOnInit() {
    if(this.isCustomer){
      this.onChanges();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['datas'] && this.datas) {
      // console.log('changed data', this.datas);
      this.sortDatas();
      this.initData(this.datas);
    }
  }

  sortDatas() {
    if(!this.isCustomer){
      this.datas.sort(function(a, b) { return a.name - b.name; })
    }
  }
  toogleDropDown() {
    this.showDropDown = !this.showDropDown;
  }
  getSearchValue() {
    return this.formGroup.value.name;
  }
  initSelectdedValue(value) {
    // this.formGroup.patchValue({"name":this.datas[value].name});
    this.initData(this.getByValue(value));
    this.toogleDropDown();
  }

  getByValue(value): DataForm {
    let arrayWithElem =  this.datas.filter( elem => elem.name === value);
    return arrayWithElem[0];
}

  initForms(): void {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      number: ['', Validators.required],
      cp: ['', Validators.required],
      state: ['', Validators.required],
      phone: ['', Validators.required],
      info1: ['', Validators.required],
      info2: ['', Validators.required],
      type: ['', Validators.required],
      fk_client: ['', Validators.required],
      active: [true, Validators.required],
    });
  }

  initData(data): void {
    let dataCurrent = data;
    if(!dataCurrent[0]) {
      this.formGroup.setValue({
        name: dataCurrent.name,
        address: dataCurrent.address,
        number: dataCurrent.number,
        cp: dataCurrent.cp,
        state: dataCurrent.state,
        phone: dataCurrent.phone,
        info1: dataCurrent.info1,
        info2: dataCurrent.info2,
        type: dataCurrent.type,
        fk_client: dataCurrent.fk_client,
        active: dataCurrent.active
      });
    }

  }


  onChanges(): void {
    this.formGroup.valueChanges.subscribe(val => {
      this.updateDataForm.emit(val);
      });
  }

  // editCustomer() {
  //   console.log('formGroup.value', this.formGroup.value);
  //   this.updateCustomer.emit(this.formGroup.value);
  //
  // }


}
