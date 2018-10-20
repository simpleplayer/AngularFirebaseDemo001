
import { Subscription, BehaviorSubject } from "rxjs";
// Store
import { Store, select } from '@ngrx/store';
import * as fromItem from '../state/item.reducer';
import * as fromItemAction from '../state/item.actions';
import { Item } from "./item";

export class ItemDatabase  {


    /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  subscription:Subscription = new Subscription();

  get data(): Item[] {
    return this.dataChange.value;
  }
  constructor(private store: Store<fromItem.State>) {

    // dispatch action
    this.store.dispatch(new fromItemAction.GetItems);
   
    // get the List of items
    this.subscription = this.store.pipe(select(fromItem.getItems)).subscribe(items => this.dataChange.next(items));
  
  }

  unsubscribe() {
    this.subscription.unsubscribe();
  }


  
}
