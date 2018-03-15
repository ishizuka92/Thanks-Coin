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
    this.service.getDataSource(this.loginUser)
      .subscribe(
        // 取得成功時処理
        res => {
          console.log(res);
          console.table(res);
          this.dataSource = this.service.sortByTimestamp(res); //表示するリスト一覧  
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
}