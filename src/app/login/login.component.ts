import { Component, OnInit } from '@angular/core';
import  {SessionService} from '../shared/session/session.service';
import {LoginService} from './login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: string;
  loginPassword: any;


  constructor(private loginservice: LoginService,private sessionservice: SessionService) { }

  ngOnInit() {
  }

  onKeyUser(loginUser: string){
    this.loginUser = loginUser;
    console.log('this.loginUser is ' + this.loginUser);
  }

  onKeyPassword(loginPassword: any){
    this.loginPassword = loginPassword;
    console.log('this.loginPassword is ' + this.loginPassword);
  }

  onClickLogin(){
    if(this.loginservice.loginCheck(this.loginUser,this.loginPassword)){
      console.log('loginok1');
      this.sessionservice.login(this.loginUser);
      alert('Successful Login!');
    }
    else{
      alert('Unsuccessful Login!');
    }
  }


}
export interface User{
  user:string;
  password:any;
}
