import { Injectable } from '@angular/core';
import {ASSETS} from './mock-home'

@Injectable()
export class AssetsService {

  constructor() { }

  assetsCheck(loginUser:string): number{
    for(let u in ASSETS){
      console.log("i is " + u)
      if(loginUser == ASSETS[u].user){
        return ASSETS[u].assets;
      }
    }
    return 0;
  }

}
