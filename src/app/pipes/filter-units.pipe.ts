import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUnits',
  pure: false
})
export class FilterUnitsPipe implements PipeTransform {

  transform(value: any): any {

    const curr = value.map(data => data.rentalSiteBuildingUnit);
    // Remove the duplicate elements
    return curr.filter((x, i, a) => x && a.indexOf(x) === i);
  }
}
