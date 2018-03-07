import { Component, OnInit } from '@angular/core';
import  {SessionService,Session} from '../session/session.service';
import { HomeCheckService } from '../../home/home-check.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginUser: string;
  assets: number;

  constructor(private sessionservice: SessionService, private homecheckservice:HomeCheckService ) { }

  ngOnInit() {
    this.sessionservice.sessionState.subscribe((session: Session)=> {
      if(session.login) {
          this.loginUser = session.user;
          this.assets = this.homecheckservice.assetsCheck(this.loginUser);
      }
  })



  }

  logout():void{
    this.sessionservice.logout();
    console.log('logout1');
  }
}
