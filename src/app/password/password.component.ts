import { Component, OnInit } from '@angular/core';
import  {SessionService} from '../shared/session/session.service';
import {LoginService} from '../login/login.service';
import {PasswordService} from './password.service';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

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
  form: FormGroup;

  constructor(private logiservice: LoginService,private sessionservice: SessionService,private passwordservice:PasswordService,private formbuilder: FormBuilder) {
    this.form = formbuilder.group({
      name: formbuilder.group({
        oldPassword:'',
        newPassword1: '',
        newPassword2: '',
      }),
    })
   }

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
        console.log(this.passwordservice.changePassword(this.loginUser,this.newPassword1));
        alert('パスワード変更に成功しました。');
        this.form.reset();

      }else{
        alert('新しいパスワードが一致しません。');
      }
    }else{
      alert('古いパスワードが間違っています。');
    }
  }

}
