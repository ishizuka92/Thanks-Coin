import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort } from '@angular/material';

import { TransactionsService } from './transactions.service';
import { MessageDialog } from '../../common/message-dialog.component';


/**
 * @title Table with pagination
 */
@Component({
  providers: [TransactionsService],
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, AfterViewInit {
  // サービス利用の宣言
  constructor(private service: TransactionsService,
    public dialog: MatDialog) { }

  public displayedColumns;
  public dataSource;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {

    // 表示項目の取得
    this.displayedColumns = this.service.getDisplayColumns();
    // リストの取得
    this.service.getDataSource()
      .subscribe(
        // 取得成功時処理
        res => {
          console.log(res);
          console.table(res);
          this.dataSource = this.service.getDataSourceSort(res); // 表示するリスト一覧
        },
        // 取得エラー時処理（VPN接続していない等接続エラーやタイムアウト）
        error => {
          alert('データ取得時エラー発生');
        }
      );
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  // // メッセージ用ダイアログ
  // // ボタン押下時の処理
  // openDialog(message:string) {
  //   let dialogRef = this.dialog.open(MessageDialog, {
  //     width: '500px',
  //     data: { messageDisp: message}
  //   });
  // }
}

// リストの項目宣言(台帳から取得してくる項目をここで宣言)
export interface Element {
  timestamp: string;
  sender: string;
  receiver: number;
  amount: string;
  message: string;
}
