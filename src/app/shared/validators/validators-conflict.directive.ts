import {AbstractControl, ValidatorFn} from "@angular/forms";
import {Observable} from "rxjs";
import {DataForm} from "../../models/DataForm";

/** A hero's name can't match the given regular expression */
export function ValidatorforbiddenName(nameRe: Observable<DataForm[]>): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.subscribe().filter(data => {
      return data === control.value
    });
    return forbidden.length > 0 ? {'duplicate': {value: true}} : null;
  };
}
