import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import {MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort} from '@angular/material';
import {HistoryService} from './history.service';
import {MessageDialog} from '../common/message-dialog.component';
import { HistoryElement } from '../home/mock-home';
import { SessionService,Session } from '../shared/session/session.service';


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
              public dialog: MatDialog,
              private sessionservice:SessionService) { }

  public displayedColumns;
  public dataSource;
  loginUser: string;

  ngOnInit() {
    this.loginUser = this.sessionservice.session.user;
    // 表示項目の取得
    this.displayedColumns = this.service.getDisplayColumns();
    // リストの取得
    this.service.getDataSource()
      .subscribe(
        // 取得成功時処理
        res => {
          console.log(res);
          console.table(res);
          this.dataSource = this.service.getDataSourceByUser(this.loginUser,res); //表示するリスト一覧  
        } ,
        // 取得エラー時処理（VPN接続していない等接続エラーやタイムアウト）
        error => {  
          alert("データ取得時エラー発生");
        }
      )
    }
    
    @ViewChild(MatSort) sort: MatSort;
  
    ngAfterViewInit() {
      this.dataSource.sort = this.sort;
    }


  // メッセージ用ダイアログ
  // ボタン押下時の処理
  // openDialog(message:string) {
  //   let dialogRef = this.dialog.open(MessageDialog, {
  //     width: '500px',
  //     data: { messageDisp: message}
  //   });
  // }
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