import { Injectable } from '@angular/core';
//import { User } from './login.component';
import {USER} from './mock-login'

@Injectable()
export class LoginService {

  constructor() { }

  loginCheck(loginUser:string,loginPassword:any): boolean{
    for(let u in USER){
      
      if(loginUser == USER[u].user && loginPassword == USER[u].password){

        return true;
      
      }
    
    }  

    return false;
  
  }

}
