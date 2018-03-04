import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientCp'
})
export class ClientCpPipe implements PipeTransform {

  transform(value: any, search: any): any {
    console.log('value -> ', value);
    console.log('value.cp -> ', value.cp);
    console.log('search -> ', search);
    if(!search) { return value; }
    let solution = value.filter(v =>{
      let val = v.cp;
      if(!val){ return; }
      return val.startsWith(search);
      // return val.indexOf(search) !== -1;
    });
    return solution;
  }

}
