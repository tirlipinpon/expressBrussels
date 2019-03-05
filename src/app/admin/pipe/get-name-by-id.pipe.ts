import { Pipe, PipeTransform } from '@angular/core';
import {DataForm} from "../../models/DataForm";

@Pipe({
  name: 'getNameById'
})
export class GetNameByIdPipe implements PipeTransform {

  transform(value: number, args?: DataForm[]): any {
    if (!value || !args.length) {
      return;
    }
    let resp =  args.find(data => +data.id === +value);
    return resp.name;
  }

}
