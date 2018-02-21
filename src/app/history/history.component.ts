import { Component, OnInit, Inject } from '@angular/core';
import {MatTableDataSource
      , MatDialog
      , MatDialogRef
      , MAT_DIALOG_DATA} from '@angular/material';
import {HistoryService} from './history.service';
import {MessageDialog} from '../common/message-dialog.component';

/**
 * @title Table with pagination
 */
@Component({
  providers: [HistoryService],
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent{

  // サービス利用の宣言
  constructor(private service: HistoryService,
              public dialog: MatDialog) { }

  // 表示項目の取得
  displayedColumns = this.service.getDisplayColumns();
  // リストの取得
  dataSource = this.service.getDataSource();

  // メッセージ用ダイアログ
  // ボタン押下時の処理
  openDialog(message:string) {
    let dialogRef = this.dialog.open(MessageDialog, {
      width: '500px',
      data: { messageDisp: message}
    });
  }
}


// // ダイアログを開いた先の処理
// @Component({
//   selector: 'message-dialog',
//   template: '<div mat-dialog-content>{{data.messageDisp}}</div>'
// })

// export class MessageDialog {
//   constructor(
//     public dialogRef: MatDialogRef<MessageDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: any) {
//      }
// }