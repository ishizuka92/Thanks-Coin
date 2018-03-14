import { Injectable } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { HISTORY_ELEMENT_DATA,HistoryElement } from './mock-home';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class HomeHistoryService {

  private apiUrlTransaction ='http://10.133.210.147:3000/api/queries/selectTransaction';

  constructor(private httpclient: HttpClient) { }

  getDisplayColumns(){
    return ['time', 'from', 'to', 'amount','message'];
  }

  getDataSource(){
    return this.httpclient.get(this.apiUrlTransaction)
    .map(res => res as HistoryElement[]);
  }


  getDataSourceByUser(loginuser:string,response:HistoryElement[]){

    let history_element_data:HistoryElement[] = [];

    response.sort((a,b) => {
      if(a.timestamp < b.timestamp) return 1;
      if(a.timestamp > b.timestamp) return -1;
      return 0;
    });

    for(let h in response){
      // console.log('h is '+ h);
      // console.log('history_element_data.length is '+ history_element_data.length);
      // console.log('response[h].sender is '+ response[h].sender.slice(34));
      if(loginuser == response[h].sender.slice(34) || loginuser == response[h].receiver.slice(34)){
        history_element_data.push(response[h]);
        //HISTORY_ELEMENT_DATA.splice[h];
        console.log('push!');
      }
      if( history_element_data.length == 10){
        break;
      }
    }
    
    let dataSource = new MatTableDataSource<HistoryElement>(history_element_data); 
    return dataSource;
  }
}
