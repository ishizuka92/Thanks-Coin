import {Component,OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import { User } from '../shared/User/user';
import { UserService} from '../shared/user/user.service';
import { RankingService } from './ranking.service';

// ローディング用
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';

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
  constructor(private service: RankingService,
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

  ngOnInit(){

  // ロード表示開始
  this.spinner.attach(new ComponentPortal(MatSpinner));
  
  // 表示項目の取得
  this.displayedColumns = this.service.getDisplayColumns();
  // リストの取得
  this.service.getDataSource()
    .subscribe(
      res => {
        this.dataSource = this.service.getDataSourceDetail(res);
        // ロード表示終了
        this.spinner.detach();
      },
      error => {
        // ロード表示終了
        this.spinner.detach();
        alert('データ取得時エラー発生');
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}