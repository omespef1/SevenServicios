import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'digitalDate'
})
export class DigitalDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
