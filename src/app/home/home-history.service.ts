import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { HISTORY_ELEMENT_DATA, HistoryElement } from './mock-home';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { SessionService } from '../shared/session/session.service';
import { User } from '../shared/user/user'

@Injectable()
export class HomeHistoryService {

  private apiUrlTransaction = 'https://169.56.20.204:58921/api/queries/selectTransaction';

  constructor(private httpclient: HttpClient,
    private sessionService: SessionService) { }

  getDisplayColumns() {
    return ['time', 'from', 'to', 'amount', 'message'];
  }

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
      })
      .slice(0, 10);


    let dataSource = new MatTableDataSource<HistoryElement>(history_element_data);
    return dataSource;
  }
}
