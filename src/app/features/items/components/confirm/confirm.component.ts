import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  // Just to make the constants and enums available in the html
  readonly ConfirmActions = ConfirmActions;
  readonly ConfirmAnswers = ConfirmAnswers;

  public action: ConfirmActions;

  constructor( @Inject(MAT_DIALOG_DATA) private data: any) {
    console.log(this.data);
    this.action = this.data.action;
  }

  ngOnInit() {
  }
}

// Constants

// Enum 
export enum ConfirmActions {
  ACTION_DELETE,
  ACTION_UPDATE
}

// Enum 
export enum ConfirmAnswers {
  CONFIRM_YES,
  CONFIRM_NO
}