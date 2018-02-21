import { Injectable } from '@angular/core';
import {USER} from '../login/mock-login'

@Injectable()
export class ChangepasswordService {

  constructor() { }

  changePassword(loginUser:string,newPassword: any): boolean{
    for(let u in USER){
      if(loginUser == USER[u].user){
        USER[u].password = newPassword;
        return true;
      }
    }
    return false;
  }

}
