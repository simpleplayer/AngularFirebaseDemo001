
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot, Action, QueryDocumentSnapshot } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item, ItemDoc } from '../../model/item';

import { Store } from '@ngrx/store';
import * as fromItem from '../../state/item.reducer';


/*
Cloud Firestore services
See documentation on :
https://github.com/angular/angularfire2/blob/master/docs/firestore/documents.md
https://github.com/angular/angularfire2/blob/master/docs/firestore/collections.md
https://github.com/angular/angularfire2/blob/master/docs/firestore/querying-collections.md
https://github.com/angular/angularfire2/blob/master/docs/firestore/offline-data.md
*/


@Injectable()
export class ItemService {

  private itemsCollection: AngularFirestoreCollection<ItemDoc>
  private items$: Observable<Item[]>;
  private itemDocument: AngularFirestoreDocument<ItemDoc>;
  private item$: Observable<Item>;


  constructor(private afs: AngularFirestore, private store: Store<fromItem.State>) {
    // The items collection
    this.itemsCollection = afs.collection('items', ref => ref.orderBy('title'));
  }

  // ==============================================
  // Get list of items
  // ==============================================
  getAllSnapshotChanges(): Observable<Item[]> {
    // To set loading spinner
    //this.store.dispatch(new fromItemAction.IsLoading(true));
    // List of items when only data is needed
    /*
    this.items = this.itemsCollection.valueChanges();
    */

    // List of items when id and data is needed
    // ValueChanges() doesn't include metadata, therefor we must use 
    // SnapshotChanges() when we require the document id and then map it properly
    this.items$ = this.itemsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          // QueryDocumentSnapshot
          const documentSnapshot: QueryDocumentSnapshot<ItemDoc> = a.payload.doc;
          // Get item
          const item: Item = this.documentToItem(documentSnapshot);
          return item;
        });
      }));
    
    return this.items$;
  }
  // ==============================================
  // Get item by id (for realtime change)
  // ==============================================
  getSnapshotChanges(id: string): Observable<Item> {
    // Check if id id valid
    if (!id) {
      return new Observable<Item>();
    }

    // Id is valid
    this.itemDocument = this.afs.doc('items/' + id);
    this.item$ = this.itemDocument.snapshotChanges().pipe(map(a => {
      // DocumentSnapshot
      const documentSnapshot: DocumentSnapshot<ItemDoc> = a.payload;
      // Item
      const item: Item = this.documentToItem(documentSnapshot);
      return item;
    }));
    return this.item$;

  }
  // ==============================================
  // Get item by id
  // ==============================================
  get(id: string): Promise<any> {
    this.itemDocument = this.afs.doc('items/' + id);
    return this.itemDocument.ref.get();
  }
  // ==============================================
  // Add item
  // ==============================================
  add(item: Item): Promise<any> {
    const itemDoc: ItemDoc = this.itemToDocument(item);
    return this.itemsCollection.add(itemDoc)
      .then(result =>
        console.log('Item successfully added ', result)
      )
      .catch(error =>
        console.log('Item unsuccessfully added ', error)
      )
      ;
  }
  // ==============================================
  // Update item
  // ==============================================
  update(item: Item): Promise<any> {
    this.itemDocument = this.afs.doc('items/' + item.id);
    const itemDoc: ItemDoc = this.itemToDocument(item);
    return this.itemDocument.update(itemDoc);
  }

  // ==============================================
  // Delete item
  // ==============================================
  delete(id: string): Promise<any> {
    this.itemDocument = this.afs.doc('items/' + id);
    console.log('Delete Item with id  ', id);
    return this.itemDocument.delete()
      .then(result =>
        console.log('Item successfully deleted ', result)
      )
      .catch(error =>
        console.log('Item unsuccessfully deleted ', error)
      );
    ;
  }
  // ==============================================
  // Item to Document
  // ==============================================
  itemToDocument(item: Item): ItemDoc {
    const clone = { ...item };
    delete (clone.id);
    const itemDoc: ItemDoc = { ...clone as ItemDoc };
    return itemDoc;
  }
  // ==============================================
  // Document to Item
  // ==============================================
  documentToItem(documentSnapshot: DocumentSnapshot<ItemDoc> | QueryDocumentSnapshot<ItemDoc>): Item {
    if (documentSnapshot.exists) {
      const data = documentSnapshot.data();
      const id: string = documentSnapshot.id;
      const item: Item = { id, ...data as ItemDoc };
      return item;
    } else {
      return {} as Item;
    }
  }

}
