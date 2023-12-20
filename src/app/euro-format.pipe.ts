import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'euroFormat'
})
export class EuroFormatPipe implements PipeTransform {

  transform(value: number): string {
    // Check if value is not null or undefined
    if (value == null) {
      return '';
    }

    // Check if the value is already formatted
    const stringValue = value.toString();
    if (stringValue.includes('.') && stringValue.split('.')[1].length === 2) {
      return stringValue;
    }

    return value.toFixed(2);
  }

}
