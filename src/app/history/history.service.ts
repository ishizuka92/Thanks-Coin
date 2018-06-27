import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { HISTORY_ELEMENT_DATA, HistoryElement } from '../home/mock-home';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { SessionService } from '../shared/session/session.service';
import { User } from '../shared/user/user'

@Injectable()
export class HistoryService {
  private apiUrlTransaction = 'https://bc.it-one.co.jp:58921/api/queries/selectTransaction';

  constructor(private httpclient: HttpClient,
    private sessionService: SessionService) { }

  // 表示カラム取得メソッド
  getDisplayColumns() {
    return ['time', 'from', 'to', 'amount', 'message'];
  }

  // 台帳からデータを取得する
  // 枚数が同じ場合は社員番号の昇順で表示
  getDataSource() {
    return this.httpclient.get(this.apiUrlTransaction)
      .map(res => res as HistoryElement[]);
  }

  getDataSourceByUser(loginuser: string, response: HistoryElement[]) {

    const history_element_data: HistoryElement[] = Array.from(response)
      .sort((a, b) => {
        if (a.timestamp < b.timestamp) return 1;
        if (a.timestamp > b.timestamp) return -1;
        return 0;
      })
      .map(r => {
        r.sender = r.sender.slice(34);
        r.receiver = r.receiver.slice(34);
        return r;
      })
      .filter(r => loginuser === r.sender || loginuser === r.receiver)
      .map(r => {
        const sender: User = this.sessionService.session.users.filter(u => u.id === r.sender)[0];
        r.sender = sender.lastName + sender.firstName;
        const receiver: User = this.sessionService.session.users.filter(u => u.id === r.receiver)[0];
        r.receiver = receiver.lastName + receiver.firstName;
        return r;
      });

    const dataSource = new MatTableDataSource<HistoryElement>(history_element_data);
    return dataSource;
  }

}

