import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { SessionService } from '../shared/session/session.service';
import { LoginService } from '../login/login.service';
import { PasswordService } from './password.service';
import { User } from '../shared/user/user';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  loginUser: User;
  oldPassword: any;
  newPassword1: any;
  newPassword2: any;
  form: FormGroup;

  constructor(private logiservice: LoginService
    , private sessionservice: SessionService
    , private passwordservice: PasswordService
    , private formbuilder: FormBuilder) {
    this.form = formbuilder.group({
      name: formbuilder.group({
        oldPassword: '',
        newPassword1: '',
        newPassword2: '',
      }),
    })
  }

  ngOnInit() {
  }

  onKeyOldPassword(oldPassword: any) {
    this.oldPassword = oldPassword;
  }

  onKeyNewPassword1(newPassword1: any) {
    this.newPassword1 = newPassword1;
  }

  onKeyNewPassword2(newPassword2: any) {
    this.newPassword2 = newPassword2;
  }

  onClickChangePassword(): void {
    this.loginUser = this.sessionservice.session.user;

    if (this.loginUser.password !== this.oldPassword) {
      alert('古いパスワードが間違っています。');
      return;
    }

    if (this.newPassword1 !== this.newPassword2) {
      alert('新しいパスワードが一致しません。');
      return;
    }

    this.passwordservice.changePassword(this.loginUser, this.newPassword1).subscribe(
      res => {
        alert('パスワードを変更しました。');
        this.form.reset();
      }
    );

  }
}
