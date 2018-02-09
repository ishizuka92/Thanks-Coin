import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject}  from 'rxjs/Subject'; 

@Injectable()
export class SessionService {

  public session = new Session();
  public sessionSubject = new Subject<Session>();
  public sessionState = this.sessionSubject.asObservable();

  constructor(private router: Router) { }

  //ユーザー認証サービスOKならこのメソッドを呼び出す。
  login(loginUser:string): void {
    this.session.login = true;
    this.session.user = loginUser;
    this.sessionSubject.next(this.session);
    this.router.navigate(['home']);
    console.log('loginok2');
  }

  logout(): void {
    this.sessionSubject.next(this.session.reset());
    this.router.navigate(['login']);
  }

}

export class Session {
  login: boolean;
  user: string;

  constructor() {
    this.login = false;
    this.user = "";
  }

  reset(): Session {
    this.login = false;
    this.user = "";
    return this;
  }

}