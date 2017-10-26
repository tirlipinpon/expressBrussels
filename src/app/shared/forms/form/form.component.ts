import {
  Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges, Output, EventEmitter,
  AfterContentChecked, AfterViewChecked
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataForm} from "../../../models/DataForm";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  @Input('isCustomer') isCustomer: boolean;
  @Input('formGroup') formGroup: FormGroup;
  @Output() updateDataForm = new EventEmitter<FormGroup>();
  showDropDown = false;
  private _user: DataForm[] = [];

  @Input('datas') set data(value: DataForm[]) {
    if (!!value) {

      if (this.isCustomer) {
        this._initData(value);
      }else{
        for(let i=0; i< Object.keys(value).length; i++){
          this._user.push(value[i]);
        }
      }
    }
  }

  constructor() {}

  private _initData(data): void {
    this.formGroup.setValue({
      id: data.id,
      name: data.name,
      address: data.address,
      number: data.number,
      cp: data.cp,
      state: data.state,
      phone: data.phone,
      info1: data.info1,
      info2: data.info2,
      type: data.type,
      fk_client: data.fk_client,
      active: data.active,
      created: data.created,
      fk_type: data.fk_type
    });
  }

  saveData(): void {
    console.log('button pushed for save data = ', this.formGroup.value);
    this.updateDataForm.emit(this.formGroup.value);
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if(changes['datas'] && this.data) {
  //     console.log('changed data', this.data);
  //     // this.sortDatas();
  //     // this.initData(this.datas);
  //   }
  // }

//
//   sortDatas() {
//     if(!this.isCustomer){
//       this._user.sort(function(a, b) { return a.name - b.name; })
//     }
//   }


  toogleDropDown() {
    // console.log('toogleDropDown showDropDown = '+  this.showDropDown)
    this.showDropDown = !this.showDropDown;
  }

  getSearchValue() {
    return this.formGroup.value.name;
  }

  initSelectdedValue(value) {
    // this.formGroup.patchValue({"name":this.datas[value].name});
    console.log('initSelectdedValue');
    this._initData(this.getByValue(value));
    this.toogleDropDown();
  }

  getByValue(value): DataForm {
    let arrayWithElem = this._user.filter(elem => elem.name === value);
    return arrayWithElem[0];
  }

//   editCustomer() {
//     console.log('formGroup.value', this.formGroup.value);
//     this.updateCustomer.emit(this.formGroup.value);
//
//   }
//

  // private setValues(): void {
  //   if (this._isFormSet && this._isUserSet) {
  //     this.form.get('id').setValue(this.user.id);
  //     this.form.get('email').setValue(this.user.email);
  //     this.form.get('role').get('name').setValue(this.user.role.name);
  //     this.form.get('firstname').setValue(this.user.firstname);
  //     this.form.get('lastname').setValue(this.user.lastname);
  //     this.form.get('secretQuestion').setValue(this.user.secretQuestion);
  //     this.form.get('secretAnswer').setValue(this.user.secretAnswer);
  //
  //     if (!!this.user.languages) {
  //       let languagesArray = this.form.get('languages') as FormArray;
  //       this.user.languages.forEach(
  //         (language: ILanguage) => {
  //           languagesArray.push(new FormGroup({
  //             code: new FormControl(language.code)
  //           }));
  //         }
  //       );
  //     }
  //
  //     let address = this.user.address || <IAddress>{};
  //     let postCode = address.postCode || '';
  //     let city = address.city || '';
  //     let country = address.country || <ICountry>{};
  //     let countryCode = country.code || '';
  //
  //     this.form.get('address').get('postCode').setValue(postCode);
  //     this.form.get('address').get('city').setValue(city);
  //     this.form.get('address').get('country').get('code').setValue(countryCode);
  //
  //     let linesArray = (this.form.get('address') as FormGroup).get('lines') as FormArray;
  //
  //     if (!!address.lines) {
  //       address.lines.forEach(
  //         (line: IAddressLine) => {
  //           linesArray.push(new FormGroup({
  //             index: new FormControl(line.index),
  //             line: new FormControl(line.line)
  //           }));
  //         }
  //       );
  //     }
  //
  //     if (linesArray.length === 0)
  //       linesArray.push(new FormGroup({
  //         index: new FormControl(linesArray.length),
  //         line: new FormControl()
  //       }));
  //
  //     if (this.user.role.isHelper) {
  //       let helperProfile: IHelperProfile = this.user.helperProfile || <IHelperProfile>{};
  //       let birthDate: Date = !!helperProfile.birthDate
  //         ? moment.utc(helperProfile.birthDate).toDate()
  //         : null;
  //       let nationalRegistrationNumber: string = !!helperProfile.nationalRegistrationNumber
  //         ? conformToMask(helperProfile.nationalRegistrationNumber, this.nationalNumberMask, {guide: false}).conformedValue
  //         : '';
  //       let vatNumber: string = !!helperProfile.vatNumber
  //         ? conformToMask(helperProfile.vatNumber, this.vatNumberMask, {guide: false}).conformedValue
  //         : '';
  //       let iban: string = !!helperProfile.iban
  //         ? conformToMask(helperProfile.iban, this.ibanMask, {guide: false}).conformedValue
  //         : '';
  //       let bic: string = helperProfile.bic || '';
  //       let sepa: string = helperProfile.sepa || '';
  //       let nationality: INationality = <INationality>helperProfile.nationality || <INationality>{};
  //       let nationalityCode: string = nationality.code || '';
  //
  //       this.form.get('helperProfile').get('birthDate').setValue(birthDate);
  //       this.form.get('helperProfile').get('nationalRegistrationNumber').setValue(nationalRegistrationNumber);
  //       this.form.get('helperProfile').get('vatNumber').setValue(vatNumber);
  //       this.form.get('helperProfile').get('iban').setValue(iban);
  //       this.form.get('helperProfile').get('bic').setValue(bic);
  //       this.form.get('helperProfile').get('sepa').setValue(sepa);
  //       this.form.get('helperProfile').get('nationality').get('code').setValue(nationalityCode);
  //     }
  //   }
  //   }
}
