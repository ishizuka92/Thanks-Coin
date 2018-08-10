import {Component,OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import { User } from '../shared/User/user';
import { UserService} from '../shared/user/user.service';
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
export class RankingComponent implements OnInit, AfterViewInit{

  // サービス利用の宣言
  constructor(private service: RankingService) { }

  public displayedColumns;
  public dataSource;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(){
  // 表示項目の取得
  this.displayedColumns = this.service.getDisplayColumns();
  // リストの取得
  this.service.getDataSource()
    .subscribe(
      res => {
        this.dataSource = this.service.getDataSourceDetail(res);
      },
      error => {
        alert('データ取得時エラー発生');
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}