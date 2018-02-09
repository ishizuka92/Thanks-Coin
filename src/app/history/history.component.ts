import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {HistoryService} from './history.service';

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
  constructor(private service: HistoryService) { }

  // 表示項目の取得
  displayedColumns = this.service.getDisplayColumns();
  // リストの取得
  dataSource = this.service.getDataSource();

}
