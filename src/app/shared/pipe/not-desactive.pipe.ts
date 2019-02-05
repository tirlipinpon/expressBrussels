import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notDesactive'
})
export class NotDesactivePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return;
    }
    return value.filter(data => data.active != 0)
  }

}
