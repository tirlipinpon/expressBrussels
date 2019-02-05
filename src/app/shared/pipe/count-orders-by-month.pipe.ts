import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countOrdersByMonth'
})
export class CountOrdersByMonthPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value || !args) return null;

    return  args.filter(data =>
      data.created.slice(5, 7) === value && +data.created.slice(0, 4) === +(new Date()).getFullYear()
    ).length;
  }

}
