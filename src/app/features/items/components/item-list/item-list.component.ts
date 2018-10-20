import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Store, select } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';

import { ItemDetailComponent } from '../item-detail/item-detail.component';
import { Item, ItemDetailAnswers,ItemDetailActions } from '../../model/item';



import { ConfirmComponent, ConfirmAnswers, ConfirmActions } from '../confirm/confirm.component';
import { ItemService } from '../../services/item/item.service';

import * as fromItem from '../../state/item.reducer';
import * as fromItemAction from '../../state/item.actions';
import { ClearSelectedItem } from '../../state/item.actions';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {

   // properties
   items: Item[];
   selectedItem = <Item>{};
   isLoading: boolean;
   error:string=null;


  private subscription: Subscription = new Subscription();
  private subscription1: Subscription = new Subscription();
  private subscription2: Subscription = new Subscription();
  private subscription3: Subscription = new Subscription();
  private subscription4: Subscription = new Subscription();


  constructor(
    private itemService: ItemService,
    private dialog: MatDialog,
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
    this.subscription2 =this.store.pipe(select(fromItem.isLoading)).subscribe(
      isLoading => this.isLoading = isLoading
    );
    // Get the selected items
    this.subscription3 =this.store.pipe(select(fromItem.getItem)).subscribe(
      item => this.selectedItem = item
    );
    // Get the error
    this.subscription4 =this.store.pipe(select(fromItem.getError)).subscribe(
      error => {this.error = error;  if ( error != null) this.openSnackBar('An error occured : ' + error,'action')}
    );
  }

  ngOnDestroy() {
    // Clean up all subscriptions
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
    this.subscription4.unsubscribe();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


  add() {
    // new item
    let item: Item = {
      id: '',
      title: '',
      description: ''
    };
    // Open Dialog
    this.subscription = this.dialog.open(ItemDetailComponent, { data: { action: ItemDetailActions.ACTION_CREATE, item: item } }).afterClosed().subscribe(
      result => {
        if (result == ItemDetailAnswers.ANSWER_OK) {
          // Validate 
          if (item.title != '' && item.description != '') {
            this.itemService.add(item);
          }
        } else {
          console.log('Item not added.');
        }
      }
    );
  }

  delete(id: string) {
    // get confirmation first from confirm dialog.
    // If confirmed, call the delete service

    this.subscription = this.dialog.open(ConfirmComponent, { data: { action: ConfirmActions.ACTION_DELETE } }).afterClosed().subscribe(
      result => {
        if (result == ConfirmAnswers.CONFIRM_YES) {
          this.itemService.delete(id);
        } else {
          console.log('Item not deleted.');
        }
      }
    );


  }

  update(id: string) {
    // Retrieve item
    this.itemService.get(id)
      .then(doc => {
        let item: Item = doc.data();
        // The id is not in doc.data() ????, so set it here form the doc.
        item.id = doc.id;

        // Open Dialog
        this.subscription = this.dialog.open(ItemDetailComponent, { data: { action: ItemDetailActions.ACTION_UPDATE, item: item } }).afterClosed().subscribe(
          result => {
            if (result == ItemDetailAnswers.ANSWER_OK) {
              if (item.title != '' && item.description != '') {
                this.itemService.update(item);
                this.store.dispatch(new fromItemAction.UpdateItem(item));
                console.log('Item updated : ', item);
              }
            } else {
              console.log('Item not updated.');
            }
          }
        );
      }
      ).catch(error => console.log('Error during get : ', error));
  }
}
