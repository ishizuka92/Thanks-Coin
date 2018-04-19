import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { CanActivate } from '@angular/router';

import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Injectable()
export class SessionService implements CanActivate {

  public session = new Session();
  public sessionSubject = new Subject<Session>();
  public sessionState = this.sessionSubject.asObservable();

  constructor(private router: Router,
    private userService: UserService) { }

  // ユーザー認証サービスOKならこのメソッドを呼び出す。
  login(loginUser: User): void {
    this.session.login = true;
    this.session.user = loginUser;
    this.userService.getAll().subscribe(users => {
      this.session.users = users;
    })
    this.sessionSubject.next(this.session);
    this.canActivate();
    this.router.navigate(['home']);
  }

  logout(): void {
    this.sessionSubject.next(this.session.reset());
    location.reload();
    // this.canActivate();
    // this.router.navigate(['login']);
  }

  canActivate() {
    if (this.session.login) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}

export class Session {
  login: boolean;
  user: User;
  users: Array<User>;

  constructor() {
    this.login = false;
    this.user = undefined;
    this.users = [];
  }

  reset(): Session {
    this.login = false;
    this.user = undefined;
    this.users = [];
    return this;
  }

}
