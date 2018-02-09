import { Injectable } from '@angular/core';
import { CanActivate }    from '@angular/router';
import {SessionService,Session} from '../session/session.service';


@Injectable()
export class AuthguardService implements CanActivate {

  constructor(public sessionService: SessionService){}

  check: boolean = false;

  canActivate() {
    this.sessionService.sessionState.subscribe((session: Session)=> {
    if(session.login) {
        console.log('loginok3');
        this.check = true;
    }
    })

    return this.check;

  }

}
