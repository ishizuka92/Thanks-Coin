import { Injectable } from '@angular/core';
import {USER} from './mock-home'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { environment } from '../../environments/environment';

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

  amountCheck(amount:number): number{
    return ((n:number) => isNaN(n) ? 0 : n)(Number(amount));
  }

  messageCheck(message:string): string{
    if(message != ''){
      return message;
    }
    return 'no message';
  }

}
