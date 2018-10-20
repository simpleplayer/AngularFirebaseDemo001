import { Component, OnInit, Input, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Item, ItemDetailAnswers, ItemDetailActions } from '../../model/item';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})


export class ItemDetailComponent implements OnInit {

  // properties
  public action: ItemDetailActions;
  private item: Item;

  // Just to make the constants and enums available in the html
  readonly ItemDetailActions = ItemDetailActions;
  readonly ItemDetailAnswers = ItemDetailAnswers;

  // constructor
  constructor(public dialogRef: MatDialogRef<ItemDetailComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  // On init
  ngOnInit() {
    this.action = this.data.action;
    this.item = this.data.item;
    this.setFormData();
  }


  // the reactive form
  itemFormGroup: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
  });

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
    this.title.patchValue(this.item.title);
    this.description.patchValue(this.item.description);
  }

  // close the dialog
  closeDialog() {
    this.dialogRef.close(ItemDetailAnswers.ANSWER_CANCEL);
  }

  // save dialog data
  saveDialog() {
    this.getFormData();

    this.data.item = this.item;
    this.dialogRef.close(ItemDetailAnswers.ANSWER_OK);
  }



}
