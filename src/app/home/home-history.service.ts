import { Injectable } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { HISTORY_ELEMENT_DATA,HistoryElement } from './mock-home';

@Injectable()
export class HomeHistoryService {

  constructor() { }

  getDisplayColumns(){
    return ['time', 'from', 'to', 'amount','message'];
  }

  getDataSource(loginuser:string){

    let history_element_data:HistoryElement[] = [];

    for(let h in HISTORY_ELEMENT_DATA){
      console.log('h is '+ h);
      console.log('history_element_data.length is '+ history_element_data.length);
      if(loginuser == HISTORY_ELEMENT_DATA[h].from || loginuser == HISTORY_ELEMENT_DATA[h].to){
        history_element_data.push(HISTORY_ELEMENT_DATA[h]);
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
