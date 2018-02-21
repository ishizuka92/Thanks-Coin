import { Component, OnInit, Inject } from '@angular/core';
import {MatTableDataSource
      , MatDialog
      , MatDialogRef
      , MAT_DIALOG_DATA} from '@angular/material';
import {TransactionsService} from './transactions.service';
import {MessageDialog} from '../../common/message-dialog.component';


/**
 * @title Table with pagination
 */
@Component({
  providers: [TransactionsService],
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent{

  // サービス利用の宣言
  constructor(private service: TransactionsService,
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
