import { Injectable } from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';

@Injectable({providedIn: 'root'})
export class FindInvalidControlService {

  constructor() { }

  setLastElemGroupArray(data: string[]): void {
    data[data.length - 1] =
      ' [' + data[data.length - 1] + '] ';
  }

  find(formToInvestigate: FormGroup|FormArray): string[] {
    const invalidControls: string[] = [];
    const recursiveFunc = (form: FormGroup|FormArray, space: string) => {
      Object.keys(form.controls).forEach(field => {
        const control = form.get(field);
        if (control.invalid) {
          invalidControls.push(field + space)
        };
        if (control instanceof FormGroup) {
          this.setLastElemGroupArray(invalidControls);
          recursiveFunc(control, ' ');
        } else if (control instanceof FormArray) {
          this.setLastElemGroupArray(invalidControls);
          recursiveFunc(control, ' ');
        }
      });
    };
    recursiveFunc(formToInvestigate, ' ');
    return invalidControls;
  }
}
