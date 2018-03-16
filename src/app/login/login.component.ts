import { Component, OnInit } from '@angular/core';
import  {SessionService} from '../shared/session/session.service';
import {LoginService} from './login.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: string;
  loginPassword: any;
  private apiUrl ='http://10.133.210.147:3000/api/User';
  check: boolean = true;

  constructor(
    private loginservice: LoginService,
    private sessionservice: SessionService,
    private http:HttpClient) { }

  ngOnInit() {
  }

  onKeyUser(loginUser: string){
    this.loginUser = loginUser;
  }

  onKeyPassword(loginPassword: any){
    this.loginPassword = loginPassword;
  }

  onClickLogin(){
    this.http.get(this.apiUrl).subscribe(response => {
      for(let u in response){
        if(this.loginUser == response[u].id && this.loginPassword == response[u].password){
          this.sessionservice.login(this.loginUser);
          this.check=false;
          break;
        } 
      }
      if(this.check){
        alert('ログインに失敗しました。');
      }
    });
  }
}

