import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberTransformToMonth'
})
export class NumberTransformToMonthPipe implements PipeTransform {

  transform(value: string, args?: any): string {
   if (!value) {
     return;
   }
   let month: string;
    switch(value) {
      case '01':
        month = 'janvier';
        break;
      case '02':
        month = 'fevrier';
        break;
      case '03':
        month = 'mars';
        break;
      case '04':
        month = 'avril';
        break;
      case '05':
        month = 'mai';
        break;
      case '06':
        month = 'juin';
        break;
      case '07':
        month = 'juillet';
        break;
      case '08':
        month = 'août';
        break;
      case '09':
        month = 'septembre';
        break;
      case '10':
        month = 'octobre';
        break;
      case '11':
        month = 'novembre';
        break;
      case '12':
        month = 'decembre';
        break;

      default:
        month = 'invalid';
    }
    return month;
  }

}
