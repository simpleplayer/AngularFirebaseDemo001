import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Item } from '../../model/item';
import * as fromItem from '../../state/item.reducer';
import * as fromItemAction from '../../state/item.actions';



@Component({
  selector: 'app-item-panel-list',
  templateUrl: './item-panel-list.component.html',
  styleUrls: ['./item-panel-list.component.scss']
})
export class ItemPanelListComponent implements OnInit, OnDestroy {
  
  // properties
  items: Item[];
  selectedItem = <Item>{};
  isLoading: boolean;
  error:string=null;

  private subscription1: Subscription = new Subscription();
  private subscription2: Subscription = new Subscription();
  private subscription3: Subscription = new Subscription();
  private subscription4: Subscription = new Subscription();

  constructor(
    private store: Store<fromItem.State>,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {

    // Dispatch following actions
    this.store.dispatch(new fromItemAction.GetItems);
    this.store.dispatch(new fromItemAction.ClearSelectedItem);

    // Get values from state
    // The List of items
    this.subscription1 = this.store.pipe(select(fromItem.getItems)).subscribe(
      items => this.items = items
    );
    // The loading indicator
    this.subscription2 = this.store.pipe(select(fromItem.isLoading)).subscribe(
      isLoading => this.isLoading = isLoading
    );
    // Get the selected items
    this.subscription3 = this.store.pipe(select(fromItem.getSelectedItem)).subscribe(
      selectedIitem => this.selectedItem = selectedIitem
    );
    // Get the error
    this.subscription4 = this.store.pipe(select(fromItem.getError)).subscribe(
      error => {this.error = error;  if ( error != null) this.openSnackBar('An error occured : ' + error,'action')}
    );


  }

  ngOnDestroy() {
    // Clean up all subscriptions
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
    this.subscription4.unsubscribe();
  }

  // An item on the list was selected
  // Pass the selected item to the store
  select(item: Item) {
    this.store.dispatch(new fromItemAction.SetSelectedItem(item));
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
