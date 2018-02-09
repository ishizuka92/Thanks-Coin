import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {TransactionsService} from './transactions.service';

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
  constructor(private service: TransactionsService) { }

  // 表示項目の取得
  displayedColumns = this.service.getDisplayColumns();
  // リストの取得
  dataSource = this.service.getDataSource();

}
