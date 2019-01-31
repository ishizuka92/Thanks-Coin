import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort } from '@angular/material';

import { TransactionsService } from './transactions.service';
import { MessageDialog } from '../../common/message-dialog.component';

// ローディング用
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';


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
    public dialog: MatDialog,
    private overlay: Overlay) { }

  public displayedColumns;
  public dataSource;

  // ローディング用
  spinner = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  });

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {

    // ロード表示開始
    this.spinner.attach(new ComponentPortal(MatSpinner));

    // 表示項目の取得
    this.displayedColumns = this.service.getDisplayColumns();
    // リストの取得
    this.service.getDataSource()
      .subscribe(
        // 取得成功時処理
        res => {
          console.log(res);
          console.table(res);
          this.dataSource = this.service.getDataSourceByUser(res); // 表示するリスト一覧
          // ロード表示終了
          this.spinner.detach();
        },
        // 取得エラー時処理（VPN接続していない等接続エラーやタイムアウト）
        error => {
          // ロード表示終了
          this.spinner.detach();
          alert('データ取得時エラー発生');
        }
      );
  }


  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
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
