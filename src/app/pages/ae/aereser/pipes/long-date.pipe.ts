import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'longDate'
})
export class LongDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
