import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {USER} from './mock-login'

@Injectable()
export class LoginService {

  constructor() { }

  // loginCheck(loginUser:string,loginPassword:any,loginUserApi:string,loginPasswordApi:any): boolean{
  //   if(loginUser == loginUserApi && loginPassword == loginPasswordApi){
  //         console.log('done');
  //         return true;
  //   }  
  //   return false;
  // }

  // loginCheck(loginUser:string,loginPassword:any): boolean{
  //   this.http.get<apiResponse>(this.apiUrl).subscribe(response => {
  //     for(let u in response){
  //       console.log('response[u].id = ' + response[u].id)
  //       console.log('response[u].password = ' + response[u].password)
  //       if(loginUser == response[u].user && loginPassword == response[u].password){
  //         console.log('done');
  //         return true;
  //       }
  //     }
  //   });  
  //   return false;
  // }

  loginCheck(loginUser:string,loginPassword:any): boolean{
    for(let u in USER){
      if(loginUser == USER[u].user && loginPassword == USER[u].password){
        return true;    
      }
    }  
    return false;
  }

}
