
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
// rxjs
import { from, Observable, BehaviorSubject, Subject } from 'rxjs';
import { merge, map, takeUntil } from 'rxjs/operators';

// Items
import { Item } from '../../model/item';
import { ItemDatabase } from '../../model/item-database';


/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ItemTableDataSource extends DataSource<Item>   {
  /** Emits once if dataSource is disconnected  */
  disconnect$ = new Subject();

  dataChange: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);


  constructor(private itemDatabase: ItemDatabase, private paginator: MatPaginator, private sort: MatSort) {
    super();
    this.dataChange = this.itemDatabase.dataChange;

  }

  get data(): Item[] {
    return this.dataChange.value;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Item[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      //observableOf(this.data),
      this.dataChange,
      this.filterChange,
      this.paginator.page,
      this.sort.sortChange
    ];



    // Provides the actual data.
    return from(new Observable<Item[]>()).pipe(
      merge(...dataMutations),
      takeUntil(this.disconnect$),
      map(() => this.data.slice()),
      map(data => this.getFilteredData(data)),
      map(data => this.getSortedData(data)),
      map(data => this.getPagedData(data))
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.disconnect$.next(true);
    this.disconnect$.complete();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Item[]) {

    // Set the paginators length
    this.paginator.length = data.length;

    // Set the paginators 
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Item[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'description': return compare(a.description, b.description, isAsc);
        default: return 0;
      }
    });
  }

  /** Simple filter */
  filterChange = new BehaviorSubject<string>('');

  get filter(): string {
    return this.filterChange.value;
  }

  set filter(filter: string) {
    this.filterChange.next(filter);
  }

  private getFilteredData(data) {
    if (this.filter === '') {
      return data;
    }
    return data.filter((item: Item) => {
      const searchStr = (item.description + item.title).toLowerCase();
      return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

