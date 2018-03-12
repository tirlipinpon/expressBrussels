import { Pipe, PipeTransform } from '@angular/core';
import {DataForm} from '../../models/DataForm';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: DataForm[], search: any): any {
    console.log('value -> ', value);
    console.log('search -> ', search);
    if (!search) { return value; }
    let solution = value.filter(v =>{
      let val = v.name.toLowerCase();
      if (!val){ return; }
      return val.indexOf(search.toLowerCase()) !== -1;
    });
    return solution;
  }

}

