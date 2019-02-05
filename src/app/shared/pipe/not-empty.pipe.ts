import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notEmpty'
})
export class NotEmptyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return;
    return value.filter(data => data[args].length);
  }

}
