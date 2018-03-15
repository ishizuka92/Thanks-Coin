import { Injectable } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { HISTORY_ELEMENT_DATA,HistoryElement } from '../home/mock-home';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class HistoryService {
  private apiUrlTransaction ='http://10.133.210.147:3000/api/queries/selectTransactionByUser';

  constructor(private httpclient: HttpClient) { }

  // ★表示カラム取得メソッド
  getDisplayColumns(){
    return ['time', 'from', 'to', 'amount','message'];
  }

  // ★ユーザIDを元にデータ取得メソッド
  getDataSource(loginuser:string){

    // パラメーター設定
    let parameters={
      "sender": "resource:jp.co.itone.model.Wallet#"+loginuser, 
      "receiver": "resource:jp.co.itone.model.Wallet#"+loginuser
    }    

    // API通信
    return this.httpclient.get(this.apiUrlTransaction ,{
      params: {
        sender: parameters.sender,
        receiver: parameters.receiver
      }
    })
    .map(res => res as HistoryElement[]);
  }

  // タイムスタンプで並び替え
  sortByTimestamp(response:HistoryElement[]){
    response.sort((a,b) => {
      if(a.timestamp < b.timestamp) return 1;
      if(a.timestamp > b.timestamp) return -1;
      return 0;
    });
    let dataSource = new MatTableDataSource<HistoryElement>(response); 
    return dataSource;
  }

}

