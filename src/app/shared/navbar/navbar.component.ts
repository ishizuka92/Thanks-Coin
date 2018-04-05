import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SessionService, Session } from '../session/session.service';
import { HomeCheckService } from '../../home/home-check.service';
import { User } from '../user/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loginUser: User;
  public assets: number;
  private apiUrl = 'http://10.133.210.147:3000/api/Wallet/';

  constructor(
    private sessionservice: SessionService,
    private homecheckservice: HomeCheckService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.sessionservice.sessionState.subscribe((session: Session) => {
      if (session.login) {
        this.loginUser = session.user;
        this.http.get<ApiResponse>(this.apiUrl + this.loginUser.id).subscribe(response => {
          this.assets = response.amount;
        });
      }
    });
  }

  logout(): void {
    this.sessionservice.logout();
  }
}

interface ApiResponse {
  amount: number;
}
