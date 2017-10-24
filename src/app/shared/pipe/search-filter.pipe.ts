import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, search: any): any {
    if(!search) { return value; }
    let solution = value.filter(v =>{
      let val = v.name.toLowerCase();
      if(!val){ return; }
      return val.indexOf(search.toLowerCase()) !== -1;
    });
    return solution;
  }

}

