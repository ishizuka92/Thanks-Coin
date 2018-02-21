import { Component, OnInit } from '@angular/core';
import  {SessionService} from '../shared/session/session.service';
import {LoginService} from '../login/login.service';
import {ChangepasswordService} from './changepassword.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  loginUser: string;
  oldPassword: any;
  newPassword1: any;
  newPassword2: any;

  constructor(private logiservice: LoginService,private sessionservice: SessionService,private changepasswordservice:ChangepasswordService) { }

  ngOnInit() {
  }

  onKeyOldPassword(oldPassword:any){
    this.oldPassword = oldPassword;
    console.log('this.oldPassword is ' + this.oldPassword);
  }

  onKeyNewPassword1(newPassword1:any){
    this.newPassword1 = newPassword1;
    console.log('this.newPassword1 is ' + this.newPassword1);
  }

  onKeyNewPassword2(newPassword2:any){
    this.newPassword2 = newPassword2;
    console.log('this.newPassword2 is ' + this.newPassword2);
  }

  onClickChangePassword(){
    console.log('onClickChangePassword Click!');
    this.loginUser = this.sessionservice.session.user
    console.log('this.loginUser is ' + this.loginUser);
    if(this.logiservice.loginCheck(this.loginUser,this.oldPassword)){
      if(this.newPassword1 == this.newPassword2){
        console.log('onClickChangePassword is OK');
        console.log(this.changepasswordservice.changePassword(this.loginUser,this.newPassword1));
        alert('Successful Changepassword!');
        this.ngOnInit();
      }else{
        alert('Unmatching Newpassword!');
      }
    }else{
      alert('Unmatching Oldpassword!');
    }
  }

}
