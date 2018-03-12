import { Injectable } from '@angular/core';
import {USER} from './mock-home'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable()
export class HomeCheckService {

  constructor() { }
  
  assetsCheck(loginUser:string): number{
    for(let u in USER){
      if(loginUser == USER[u].user){
        return USER[u].assets;
      }
    }
    return 0;
  }

  toCheck(toUser:string): boolean{
    for(let u in USER){
      if(toUser == USER[u].user){
        return true;
      }
    }
    return false;
  }

  amountCheck(loginUser:string,amount:number): boolean{
    for(let u in USER){
      if(loginUser == USER[u].user){
        if(USER[u].assets >= amount){
          return true;
        }
      }
    }
    return false;
  }

  messageCheck(message:string): string{
    if(message != ''){
      return message;
    }
    return 'no message';
  }

}
