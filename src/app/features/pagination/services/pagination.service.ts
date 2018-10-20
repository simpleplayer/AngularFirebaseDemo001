import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaginationService {



  // Observables
  dataSize$ = new BehaviorSubject<number>(0);
  page$ = new BehaviorSubject<number>(0);
  pageSize$ = new BehaviorSubject<number>(0);
  

  // members
  private _page: number;
  private _pageSize: number;
  private _pageSizes: number[];
  private _dataSize: number;
  

  constructor() {
    this.pageSizes = [5, 10, 20, 100];
    this.changePageSize(5);

    // Subscribe to events
    this.page$.subscribe(value => this._page = value);
    this.pageSize$.subscribe(value => this._pageSize = value);
    this.dataSize$.subscribe(value => this._dataSize = value);
  }

  // Getter and Setters
  get page() {
    return this._page;
  }

  get pageSize() {
    return this._pageSize;
  }

  get dataSize(): number {
    return this._dataSize;
  }

  get pageSizes(): number[] {
    return this._pageSizes;
  }

  set pageSizes(pageSizes: number[]) {
    this._pageSizes = pageSizes;
  }

  // Service methods
  getPagedData(data: any) {
    //console.log('getPagedData');
    if (!data) {
      return;
    }
    
    if (data.length != this._dataSize) {
      this.changeDataSize(data.length);
      this.page$.next(0);
    }

    let startIndex = this._page * this._pageSize;
    return data.splice(startIndex, this._pageSize);
  }

  onPage(btn: any) {

    let page = this._page;

    switch (btn) {

      case 'first':
        this.page$.next(0);
        return;

      case 'prev':
        if (page > 0) {
          page--;
          this.page$.next(page);
        }
        return;

      case 'next':
        if (page <  Math.floor(this.dataSize / this.pageSize)) {
          page++;
          this.page$.next(page);
        }
        return;

      case 'last':
        page = Math.floor(this.dataSize / this.pageSize);
        this.page$.next(page);
        return;

      default:
        return;

    }
  }

  changePageSize(pageSize: number) {
    this.pageSize$.next(pageSize);
    this._page=0;
  }

  changeDataSize(dataSize: number) {
    this.dataSize$.next(dataSize);
  }

  changePage(page: number) {
    this.page$.next(page);
  }

  isFirstPage() {
    return this.page == 0 ? true : false;
  }

  isLastPage() {
    return this.page == Math.floor(this.dataSize / this.pageSize) ? true : false;
  }

}
