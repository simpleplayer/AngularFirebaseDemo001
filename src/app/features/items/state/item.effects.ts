import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';


import { Item } from '../model/item';
import { ItemService } from '../services/item/item.service';
/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as itemActions from './item.actions';


@Injectable()
export class ItemEffects {

  constructor(private itemService: ItemService,
    private actions$: Actions) { }


  // Get List of items
  @Effect()
  getItems$: Observable<Action> = this.actions$.pipe(
    ofType(itemActions.ItemActionTypes.GetItems),
    mergeMap(action =>
      this.itemService.getAllSnapshotChanges()
      //.delay(2000) // Delay to show spinner (just for test)
      .pipe(
        map(items => (new itemActions.GetItemsSuccess(items))),
        // Use "of" operator to return as an observable
        catchError(err => of(new itemActions.GetItemsFail(err)))
      )
    )
  );
  @Effect()
  getItem$: Observable<Action> = this.actions$.pipe(
    ofType(itemActions.ItemActionTypes.GetItem),
    map((action: itemActions.GetItem) => action.payload),
    mergeMap(item =>
      this.itemService.getSnapshotChanges(item.id)
      //.delay(2000) // Delay to show spinner (just for test)
      .pipe(
        map(item => (new itemActions.GetItemSuccess(item))),
        // Use "of" operator to return as an observable
        catchError(err => of(new itemActions.GetItemFail(err)))
      )
    )
  );
  // Create item
  @Effect()
  createItem$: Observable<Action> = this.actions$.pipe(
    ofType(itemActions.ItemActionTypes.CreateItem),
    map((action: itemActions.CreateItem) => action.payload),
    mergeMap((item: Item) =>
      this.itemService.add(item)
        // For add, Firestore returns a Promise, not an observable.
        // There comes no result for firestore
        .then(() => new itemActions.CreateItemSuccess(item))
        .catch(error => new itemActions.CreateItemFail(error))
    )
  );
  
    // Update item
  @Effect()
  updateItem$: Observable<Action> = this.actions$.pipe(
    ofType(itemActions.ItemActionTypes.UpdateItem),
    map((action: itemActions.UpdateItem) => action.payload),
    mergeMap((item: Item) =>
      this.itemService.update(item)
        // For update, Firestore returns a Promise, not an observable.
        // There comes no result for firestore
        .then(() => new itemActions.UpdateItemSuccess(item))
        .catch(error => new itemActions.UpdateItemFail(error))
    )
  );
    // Delete item
  @Effect()
  deleteItem$: Observable<Action> = this.actions$.pipe(
    ofType(itemActions.ItemActionTypes.DeleteItem),
    map((action: itemActions.DeleteItem) => action.payload),
    mergeMap((item: Item) =>
      this.itemService.delete(item.id)
        // For delete, Firestore returns a Promise, not an observable.
        // There comes no result for firestore
        .then(() => new itemActions.DeleteItemSuccess(item))
        .catch(error => new itemActions.DeleteItemFail(error))
    )
  );
}
