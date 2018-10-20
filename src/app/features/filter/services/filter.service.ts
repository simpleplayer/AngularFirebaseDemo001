import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filter$ = new BehaviorSubject<string>('');
  _filter: string = '';

  constructor() {
  }

  filterChanged(filter: string) {
    this._filter = filter;
    this.filter$.next(this._filter);
  }

  get filter(): string {
    return this._filter;
  }

  geFilteredData(data: any) {

    if (!this.filter)
      return data;

    if (!data)
      return data;

    const filteredData = data.filter(x => {
      return Object.values(x).reduce((prev, curr) => {
        return prev || curr.toString().toLowerCase().includes(this.filter.toLowerCase());
      }, false);
    });


    return filteredData;

  }


}
