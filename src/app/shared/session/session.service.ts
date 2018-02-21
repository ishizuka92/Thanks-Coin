import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject}  from 'rxjs/Subject';
import { CanActivate }    from '@angular/router';

@Injectable()
export class SessionService implements CanActivate{

  public session = new Session();
  public sessionSubject = new Subject<Session>();
  public sessionState = this.sessionSubject.asObservable();

  constructor(private router: Router) { }

  //ユーザー認証サービスOKならこのメソッドを呼び出す。
  login(loginUser:string): void {
    this.session.login = true;
    this.session.user = loginUser;
    this.sessionSubject.next(this.session);
    this.canActivate();
    this.router.navigate(['home']);
    console.log('loginok3');
  }

  logout(): void {
    this.sessionSubject.next(this.session.reset());
    location.reload();
    // this.canActivate();
    // this.router.navigate(['login']);
  }

  canActivate(){
    console.log('loginok2');
    if(this.session.login){
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
    }
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
