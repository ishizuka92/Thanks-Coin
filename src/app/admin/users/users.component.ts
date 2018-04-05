import { Component, OnInit } from '@angular/core';

import { UserService } from '../../shared/user/user.service';
import { User } from '../../shared/user/user';
import { WalletService } from '../../shared/wallet/wallet.service';
import { Wallet } from '../../shared/wallet/wallet';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  displayedColumns = ['id',
    'fullName',
    'dept',
    'amount',
    'pw'
  ];

  private initialPassword = 'It1pass0';

  constructor(
    private userService: UserService,
    private walletService: WalletService
  ) { }

  ngOnInit() {

    this.userService.getAll().subscribe(users => {
      this.users = users;
      this.users.forEach(user => {
        this.walletService.get(user.id).subscribe(wallet => {
          user.amount = wallet.amount;
        });
      });
    });
  }

  onClickPwInitialize(user: User) {
    if (confirm(`${user.lastName}${user.firstName}さんのパスワードを初期化しますか？`)) {
      this.userService.changePassword(user, this.initialPassword).subscribe(res => {
        alert(`${user.lastName}${user.firstName}さんのパスワードを初期化しました。`);
      });
    }
  }

}
