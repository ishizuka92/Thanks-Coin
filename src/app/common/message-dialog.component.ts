import { Component, Inject } from '@angular/core';
import {MatDialog
      , MatDialogRef
      , MAT_DIALOG_DATA} from '@angular/material';

// ダイアログを開いた先の処理
@Component({
  selector: 'message-dialog',
  template: '<div mat-dialog-content>{{data.messageDisp}}</div>'
})

export class MessageDialog {
  constructor(
    public dialogRef: MatDialogRef<MessageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     }
}