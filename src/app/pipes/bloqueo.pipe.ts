import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bloqueo'
})

export class BloqueoPipe implements PipeTransform {
  transform(value: boolean): string {
    return (value === false) ? 'No' : 'Si'
  }
}
