import { Component, OnInit } from '@angular/core';
import  {SessionService,Session} from '../session/session.service';
import { HomeCheckService } from '../../home/home-check.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loginUser: string;
  public assets: number;
  private apiUrl ='http://10.133.210.147:3000/api/Wallet/';

  constructor(
    private sessionservice: SessionService, 
    private homecheckservice:HomeCheckService,
    private http:HttpClient
   ) { }

   ngOnInit() {
    this.sessionservice.sessionState.subscribe((session: Session)=> {
      console.log('Oops');
      if(session.login) {
          this.loginUser = session.user;
          this.http.get<ApiResponse>(this.apiUrl+this.loginUser).subscribe(response => {
            this.assets = response.amount;
          });
      }
  })

  // ngOnInit() {
  //   this.sessionservice.sessionState.subscribe((session: Session)=> {
  //     if(session.login) {
  //         this.loginUser = session.user;
  //         this.assets = this.homecheckservice.assetsCheck(this.loginUser);
  //     }
  // })



  }

  logout():void{
    this.sessionservice.logout();
    console.log('logout1');
  }
}

interface ApiResponse {
  amount: number;
}