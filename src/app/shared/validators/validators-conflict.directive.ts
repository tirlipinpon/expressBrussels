import {AbstractControl, ValidatorFn, AsyncValidatorFn} from "@angular/forms";
import {Observable} from "rxjs";
import {DataForm} from "../../models/DataForm";
import 'rxjs/add/operator/toPromise';

/** A hero's name can't match the given regular expression */
export function ValidatorforbiddenName(nameRe: Observable<DataForm[]>): AsyncValidatorFn  {
  return (control: AbstractControl): Promise<{[key: string]: any}> | null  | Observable<{ [key: string]: any } | null> => {

    if (isEmptyInputValue(control.value)) {
      return Observable.of(null);
    }else {


      // const id = ctrl.id.value;
      return new Promise((resolve, reject) => {
        return nameRe.subscribe(datas => {
         const forbidden = datas.filter(data => {
           if (control.parent) {
             const ctrl = control.parent.controls;
             const ctrlId = ctrl['id'].value;
             return data.name === control.value && data.id != ctrlId;
           }else {
             resolve(null)
           }
          });
          resolve(forbidden.length > 0 ? { 'duplicate': { value: control.value } } : null);
        })
      });
    }
  };
}
function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

