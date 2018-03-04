import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientCp'
})
export class ClientCpPipe implements PipeTransform {

  transform(data: any, search: any, propName: string, propType: string): any {
    console.log('data -> ', data);
    console.log('propName -> ', propName);
    console.log('propType -> ', propType);
    console.log('search -> ', search);
    if(!search) { return data; }
    let solution = data.filter(v =>{
      let val = v[propName];
      if (!val){ return; }
      if ( propType === 'number') {
        return val.startsWith(search);
      }else if ( propType === 'string') {
          return val.indexOf(search) !== -1;
      }
    });
    return solution;
  }

}
