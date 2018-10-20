import { Component, OnInit } from '@angular/core';
import { from, BehaviorSubject, Observable } from 'rxjs';
import { merge, map, delay } from 'rxjs/operators';
import { ItemDictionary, Item } from '../../model/item';
import { PaginationService } from '../../../pagination/services/pagination.service';
import { FilterService } from '../../../filter/services/filter.service';
import { SortService } from '../../../sort/services/sort.service';


@Component({
  selector: 'app-item-test-cdk-table',
  templateUrl: './item-test-cdk-table.component.html',
  styleUrls: ['./item-test-cdk-table.component.scss']
})
export class ItemTestCdkTableComponent implements OnInit {

  // BehaviorSubject of Dictionary object 
  // By using an arry with an object name, we can later access the table
  // by the object name
  items$ = new BehaviorSubject<ItemDictionary>({});
  displayedColumns$ = new BehaviorSubject<string[]>([
    'id',
    'title',
    'description'
  ]);

  tableDataSource$: Observable<Item[]>

  constructor(
    private paginationService: PaginationService,
    private sortService: SortService,
    private filterService: FilterService) {
  }

  ngOnInit() {

    // Object.keys(x)
    // Object.keys(x).length
    // Object.keys(x)[i]

    // Object.values(x)
    // Object.values(x).length
    // Object.values(x)[i]
    const items = new ItemsData(46);
    this.items$.next(items.data);

    // tabledatasource is also an observable, but then only with the values
    this.tableDataSource$ = from(new Observable<Item[]>()).pipe(
      merge(
        this.items$,
        this.paginationService.page$, this.paginationService.pageSize$,
        this.sortService.sortKey$, this.sortService.sortDirection$,
        this.filterService.filter$
      ),
      map(() => Object.values(this.items$.value)),
      // Build in a delay, otherwise an error ExpressionChangedAfterItHasBeenCheckedError will occur in pagination.component
      // See : https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
      delay(0),
      map(data => this.filterService.geFilteredData(data)),
      map(data => this.sortService.getSortedData(data)),
      map(data => this.paginationService.getPagedData(data))
    );
    /*
      .merge(
        this.items$,
        this.paginationService.page$, this.paginationService.pageSize$,
        this.sortService.sortKey$, this.sortService.sortDirection$,
        this.filterService.filter$)
      .map(() => Object.values(this.items$.value))
      // Build in a delay, otherwise an error ExpressionChangedAfterItHasBeenCheckedError will occur in pagination.component
      // See : https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
      .delay(0)
      .map(data => this.filterService.geFilteredData(data))
      .map(data => this.sortService.getSortedData(data))
      .map(data => this.paginationService.getPagedData(data));
      */
  }



}
// ==============================
// Data
// ==============================
export class ItemsData {

  private totalRows: number;
  _data: any;

  constructor(totalRows: number) {
    this.totalRows = totalRows;
    this.initData();
  }

  initData() {

    let items = {};
    for (let i = 0; i < this.totalRows; i++) {
      let item: Item = <Item>{};
      let idx = i + 1;


      let suffix = '';
      if (idx < 10) {
        suffix += '0' + idx
      } else {
        suffix += idx
      }
      let name = 'id' + suffix;
      item.id = 'id' + suffix;
      item.title = 'title' + suffix;
      item.description = 'description' + suffix;
      items[name] = item;
    }
    //console.log('Generated items ', Object.values(items));
    this.data = items;
  }
  get data(): any {
    return this._data;
  }
  set data(data: any) {
    this._data = data;
  }
}
