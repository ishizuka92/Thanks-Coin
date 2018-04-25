import { Component, OnInit } from '@angular/core';

import { SessionService } from '../shared/session/session.service';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: string;
  loginPassword: any;
  private apiUrl = 'https://169.56.20.204:58921/api/User';
  check = true;

  constructor(
    private loginservice: LoginService,
    private sessionservice: SessionService,
    private http: HttpClient) { }

  ngOnInit() {
  }

  onKeyUser(loginUser: string) {
    this.loginUser = loginUser;
  }

  onKeyPassword(loginPassword: any) {
    this.loginPassword = loginPassword;
  }

  onClickLogin() {
    this.http.get(this.apiUrl).subscribe(response => {
      for (const u in response) {
        if (this.loginUser === response[u].id && this.loginPassword === response[u].password) {
          const user: User = <User>response[u];
          this.sessionservice.login(user);
          this.check = false;
          break;
        }
      }
      if (this.check) {
        alert('ユーザーIDかパスワードが違います。');
      }
    });
  }
}

