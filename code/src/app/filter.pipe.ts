import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items, prop1, prop2, value) {
		if (!items) return [];
		if (!value) return items;
		return items.filter(singleItem =>
      (singleItem[prop1].toLowerCase().startsWith(value.toLowerCase()) || 
      singleItem[prop2].toLowerCase().startsWith(value.toLowerCase()))
      );
	}
}
