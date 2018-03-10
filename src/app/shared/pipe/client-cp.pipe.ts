import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientCp'
})
export class ClientCpPipe implements PipeTransform {

  transform(data: any, search: any, propName: string, propType: string): any {
    // console.log('data -> ', data);
    // console.log('propName -> ', propName);
    // console.log('propType -> ', propType);
    // console.log('search -> ', search);
    if(!data) { return null; }
    if(!search) { return data; }
    let solution = data.filter(v =>{
      let val = v[propName];
      if (!val){ return; }
      if ( propType === 'number') {
        return val.startsWith(search);
      }else if ( propType === 'string') {
          search = search.toLowerCase();
          val = val.toLowerCase();
          return val.indexOf(search) !== -1;
      }
    });
    return solution;
  }

}
