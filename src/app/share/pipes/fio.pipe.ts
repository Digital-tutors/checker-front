import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fio',
})
export class FioPipe implements PipeTransform {
  transform(value: { firstName?: string; lastName?: string; middleName?: string }): string {
    console.log(value);

    let name = value.lastName;

    if (value.firstName) {
      name += ` ${value.firstName}.`;
    }

    if (value.middleName) {
      name += ` ${value.middleName}.`;
    }

    return name;
  }
}
