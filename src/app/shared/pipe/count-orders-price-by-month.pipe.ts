import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'countOrdersPriceByMonth'
})
export class CountOrdersPriceByMonthPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value || !args) return null;

    return args.map(data => {
        if (data.created.slice(5, 7) === value && +data.created.slice(0, 4) === +(new Date()).getFullYear()) {
          return +data.price
        }
        return 0
      }
    ).reduce((acc, value) => acc + value);

  }
}
