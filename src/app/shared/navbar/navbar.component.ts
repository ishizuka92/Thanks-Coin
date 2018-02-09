import { Component, OnInit } from '@angular/core';
import  {SessionService,Session} from '../session/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginUser: string;

  constructor(private sessionservice: SessionService) { }

  ngOnInit() {
    this.sessionservice.sessionState.subscribe((session: Session)=> {
      if(session.login) {
          this.loginUser = session.user;
      }
  })
  }

  logout():void{
    this.sessionservice.logout();
    console.log('logout1');
  }
}
