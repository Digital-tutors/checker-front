import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fio',
})
export class FioPipe implements PipeTransform {
  transform(value: { firstName?: string; lastName?: string; middleName?: string, email?: string }): string {
    let name = value.lastName;

    if (value.firstName) {
      name += ` ${value.firstName}.`;
    }

    if (value.middleName) {
      name += ` ${value.middleName}.`;
    }

    if (name === null) {
      name = value.email;
    }

    return name;
  }
}
