import { Injectable } from '@angular/core';
import { USER, HISTORY_ELEMENT_DATA } from './mock-home';

@Injectable()
export class HomeSendService {

  constructor() { }

  send(loginUser:string,toUser:string,amount:number,message:string):boolean{
    //ここで送金APIを呼び出す。以下は仮の処理。
    for(let u in USER){
      if(loginUser == USER[u].user){
        USER[u].assets -= amount;
      }
      if(toUser == USER[u].user){
        USER[u].assets += amount;
      }
    }
    return true;
  }

}
