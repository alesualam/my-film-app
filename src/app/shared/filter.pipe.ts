import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, filterYear: string): any {

    if (value.length === 0 || (filterString === '' && filterYear === '')) {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      let filterFlag = true;
      if (filterString !== '') {
        if (!(item.status === filterString || (filterString === 'Favorite' && item.fav === true))) {
          filterFlag = false;
        }
      }
      if (filterYear !== '') {
        if(!(item.date && item.date.split('-')[0] == filterYear)) {
          filterFlag = false
        }
      }
      if (filterFlag) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
