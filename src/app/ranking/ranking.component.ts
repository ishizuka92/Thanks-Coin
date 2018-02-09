import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { RankingService } from './ranking.service';

/**
 * @title Table with pagination
 */
@Component({
  providers: [RankingService],
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent {

  // サービス利用の宣言
  constructor(private service: RankingService) { }

  // 表示項目の取得
  displayedColumns = this.service.getDisplayColumns();
  // リストの取得
  dataSource = this.service.getDataSource();
}