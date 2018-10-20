import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SortService {


  sortKey$ = new BehaviorSubject<string>('');
  sortDirection$ = new BehaviorSubject<string>('');


  private _sortKey: string = 'id';
  private _sortDirection: string = 'asc';

  get sortKey(): string {
    return this._sortKey;
  }
  get sortDirection(): string {
    return this._sortDirection;
  }


  constructor() { }

  

  adjustSort(key: string) {
   
    if (this._sortKey === key) {
      if (this._sortDirection === 'asc') {
        this._sortDirection = 'desc';
      } else {
        this._sortDirection = 'asc';
      }

    } else {
      this._sortKey = key;
      this._sortDirection = 'asc';
    }

    this.sortKey$.next(this.sortKey);
    this.sortDirection$.next(this.sortDirection);
  }

  getSortedData(data: any) {
    const sortKey = this.sortKey;
    const sortDirection = this.sortDirection;
    const sortedData = data.sort((a, b) => {
      if (a[sortKey] > b[sortKey]) return sortDirection === 'asc' ? 1 : -1;
      if (a[sortKey] < b[sortKey]) return sortDirection === 'asc' ? -1 : 1;
      return 0;
    });
    return sortedData;
  }

}


