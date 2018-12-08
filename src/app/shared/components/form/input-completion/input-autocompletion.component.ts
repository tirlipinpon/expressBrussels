import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {debounceTime} from "rxjs/internal/operators";

@Component({
  selector: 'app-input-autocompletion',
  templateUrl: 'input-autocompletion.component.html',
  styleUrls: ['input-autocompletion.component.css']
})
export class InputAutocompletionComponent implements OnInit, OnDestroy {

  @Input() propName: string;
  @Input() propType: string;
  @Input() data: any;
  @Input() witchForm: number;
  @Input() formGroup: FormGroup;
  private showDropDown = false;
  private valueNameChanges$: any;
  disabled = false;

  constructor() {}

  ngOnInit() {
    if (this.witchForm === 1) {
      this.subscribeNameChanges();
    }
  }
  ngOnDestroy() {
    if (this.witchForm === 1) {
      this.valueNameChanges$.unsubscribe();
    }
  }
  // auto completion
  toogleDropDown(action: boolean) {
    this.showDropDown = action;
  }
  getSearchValue(value: string): string {
    return this.formGroup.get(this.propName).value;
  }
  private _initData1(data): void {
    // console.log('init data : ', data);
    this.formGroup.patchValue({
      id: data.id,
      name: data.name,
      ref_client: data.ref_client ? data.ref_client : '',
      address: data.address,
      number: data.number,
      cp: data.cp,
      state: data.state,
      clientZone: data.clientZone,
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
  private _initData2(data: any): void {
      this.formGroup.patchValue({
        cp: data?data.cp:'',
        state: data?data.state:'',
        clientZone: data?data.zone:'',
      });
  }
  setSelectdedValue(value: string,  data: string): void {
    if (this.witchForm === 1) {
      this._initData1(this.getByData(value, data));
    }else if (this.witchForm === 2) {
      this._initData2(this.getByData(value, data));
    }
    this.toogleDropDown(false);
    if (this.witchForm === 1) {
      this.isDisabled();
    }
    this.formGroup.markAsDirty();
  }
  getByData(value: string, data: any): any {
    // console.log(value, ' ' , data)
    let arrayWithElem;
    arrayWithElem = this.data.filter(elem => {
      return elem[value].toLowerCase() === data.toLowerCase()
    });
    return arrayWithElem[0];
  }
  // form purchasse order case
  subscribeNameChanges(): void {
      this.valueNameChanges$ = this.formGroup.get('name').valueChanges.pipe(debounceTime(700)).subscribe(val => {
        if ((!val || !val.length) && this.formGroup.dirty) {
          this.formGroup.get('ref_client').enable();
          this.formGroup.reset();
          this.formGroup.markAsPristine();
        }
      });

  }
  isDisabled(): void {
    if (this.formGroup.get('ref_client') && this.formGroup.get('name').value && this.formGroup.get('ref_client').value!==null && this.formGroup.get('ref_client').value!=='') {
      this.formGroup.get('ref_client').enable();
    } else {
      this.formGroup.get('ref_client').disable();
    }
  }
}
