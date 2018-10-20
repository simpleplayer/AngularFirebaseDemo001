import { Component, OnInit, OnDestroy, Input, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Item, ItemDetailAnswers, ItemDetailActions } from '../../model/item';
import { ConfirmComponent, ConfirmAnswers, ConfirmActions } from '../confirm/confirm.component';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromItem from '../../state/item.reducer';
import * as fromItemAction from '../../state/item.actions';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';



@Component({
  selector: 'app-item-panel-detail',
  templateUrl: './item-panel-detail.component.html',
  styleUrls: ['./item-panel-detail.component.scss']
})


export class ItemPanelDetailComponent implements OnInit, OnDestroy {

  // properties
  item:Item=<Item>{};

  private subscription: Subscription = new Subscription();
  private subscription1: Subscription = new Subscription();
  private subscription2: Subscription = new Subscription();


  // the reactive form
  itemFormGroup: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
  });


  matcher = new MyErrorStateMatcher();
  //
  // Just to make the constants and enums available in the html
  readonly ItemDetailActions = ItemDetailActions;
  readonly ItemDetailAnswers = ItemDetailAnswers;
  action = ItemDetailActions.ACTION_CREATE;


  // constructor
  constructor(private store: Store<fromItem.State>,  private dialog: MatDialog,) {

  }

  // On init
  ngOnInit() {

    // Clear the item. (it might have been set in a previous call of the panel)
    this.store.dispatch(new fromItemAction.ClearItem);


    // Get the selected item from the store
    // Then do getItem : will retrieve Firestore item 
    this.subscription1 = this.store.pipe(select(fromItem.getSelectedItem)).subscribe(
      selectedItem => {
        if (selectedItem && selectedItem.id) {
          this.store.dispatch(new fromItemAction.GetItem(selectedItem))
          this.action = ItemDetailActions.ACTION_UPDATE;
        } else {
          this.item = selectedItem;
          this.setFormData();
          this.action = ItemDetailActions.ACTION_CREATE;
        }
      }
    );

    // Get the firestore item from the local store
    this.subscription2 = this.store.pipe(select(fromItem.getItem)).subscribe(
      item => {
        this.item = item;
        this.setFormData();
      }
    );

  }
  ngOnDestroy() {
    // Clean up all subscriptions
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

  // Formfields
  get title() {
    return this.itemFormGroup.get('title');
  }

  get description() {
    return this.itemFormGroup.get('description');
  }

  private getFormData() {
    this.item.title = this.title.value as string;
    this.item.description = this.description.value as string;
  }

  private setFormData() {
    if (this.item) {
      this.title.patchValue(this.item.title);
      this.description.patchValue(this.item.description);
    } else {
      this.title.patchValue('');
      this.description.patchValue('');
    }
  }

  private resetForm() {
    this.itemFormGroup.reset();
  }


  // Add the item
  add() {
    if (!this.item.id) {
      this.getFormData();
      this.store.dispatch(new fromItemAction.CreateItem(this.item));
      this.clear();
    }
  }

  // Save the item
  save() {
    this.getFormData();
    if (this.item.id) {
      this.store.dispatch(new fromItemAction.UpdateItem(this.item));
    } else {
      this.store.dispatch(new fromItemAction.CreateItem(this.item));
      this.clear();
    }
  }

  // Delete the item
  delete() {
    if (this.item.id) {
      this.getFormData();
      this.subscription = this.dialog.open(ConfirmComponent, { data: { action: ConfirmActions.ACTION_DELETE } }).afterClosed().subscribe(
        result => {
          if (result == ConfirmAnswers.CONFIRM_YES) {
            this.store.dispatch(new fromItemAction.DeleteItem(this.item));
            this.clear();
          } else {
            console.log('Item not deleted.');
          }
        }
      );


      
     
    }
  }

  // Clear the item
  clear() {
    // Clear the current selected item
    this.store.dispatch(new fromItemAction.ClearSelectedItem);
    this.store.dispatch(new fromItemAction.ClearItem);
    // reset the form
    this.resetForm();

  }


}

// Following class will enable that errors in the input fields are only shown when the input fields are touched, dirty
// Otherwise errors like "required field" are shown after the Clear function

// See https://stackoverflow.com/questions/46745171/angular-material-show-mat-error-on-button-click
// Error when invalid control is dirty or touched 
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
