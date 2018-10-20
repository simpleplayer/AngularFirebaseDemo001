import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
// rxjs
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Store, select } from '@ngrx/store';

// Items
import { ItemTableDataSource } from './item-table-datasource';
import { ItemDatabase } from '../../model/item-database';
import { ItemService } from '../../services/item/item.service';

// State
import * as fromItem from '../../state/item.reducer';

@Component({
  selector: 'app-components/data-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.scss']
})
export class ItemTableComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  isLoading: boolean;

  dataSource: ItemTableDataSource;
  itemDatabase: ItemDatabase;
  subscription: Subscription = new Subscription();

  // Columns displayed in the table. Columns IDs can be added, removed, or reordered.
  displayedColumns = ['title', 'description'];

  // Constructor
  constructor(private itemService: ItemService, private store: Store<fromItem.State>) {
  }

  // On Init 
  ngOnInit() {

    this.itemDatabase = new ItemDatabase(this.store);
    this.dataSource = new ItemTableDataSource(this.itemDatabase, this.paginator, this.sort);
    // Filter field
    this.subscription = fromEvent(this.filter.nativeElement, 'keyup').pipe(
      debounceTime(100),
      distinctUntilChanged()
      )
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });

    // State field
    this.store.pipe(select(fromItem.isLoading)).subscribe(
      isLoading => this.isLoading = isLoading
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.dataSource.disconnect();
    this.itemDatabase.unsubscribe();
  }



}



