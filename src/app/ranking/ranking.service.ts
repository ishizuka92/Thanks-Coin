import { Injectable } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/user/user';
import { UserService} from '../shared/user/user.service';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';


import { environment } from '../../environments/environment';

@Injectable()
export class RankingService {
  private apiUrlTransaction = `${environment.apiUrl}/queries/selectRankingByCoin`;

  constructor(private httpclient: HttpClient,
  private userService: UserService) { }

  // 表示カラム取得メソッド
  getDisplayColumns(){
    return ['id', 'amount']; // 表示するカラム
  }

  // 台帳からデータを取得する
  // 枚数が同じ場合は社員番号の昇順で表示
  getDataSource(){
    // 型宣言
    return this.httpclient.get(this.apiUrlTransaction)
      .map(res => res as RankingElement[])  
  }

  // 詳細情報の取得（ID→姓名を取得）
  getDataSourceDetail(response:RankingElement[]){
    const ranking_element_data: RankingElement[] = Array.from(response)
    .map( r => {
      this.userService.getNameFromId(r.id)
      .subscribe(
        result =>{
          // ID → 姓名に置き換える！
          r.id = result.lastName + result.firstName;
        }
      )
      return r;
    })
    let dataSource = new MatTableDataSource<RankingElement>(ranking_element_data);
    return dataSource;
  }



}

// リストの項目宣言(台帳から取得してくる項目をここで宣言)
export interface RankingElement {
  id: string;
  amount: number;
}