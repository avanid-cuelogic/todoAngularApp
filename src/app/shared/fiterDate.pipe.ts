import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter',
})
export class DateFilterPipe implements PipeTransform {
  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || filterString === '') {
      return value;
    }
    let result: any = [];
    for (const item of value) {
      let itemDate = new Date(item[propName]).getTime();
      let filterDate = new Date(filterString).getTime();
      if (itemDate >= filterDate) {
        result.push(item);
      }
    }
    return result;
  }
}
