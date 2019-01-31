import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort } from '@angular/material';
import { HomeCheckService } from './home-check.service';
import { SessionService, Session } from '../shared/session/session.service';
import { HomeDialogComponent } from './home-dialog.component';
import { HomeHistoryService } from './home-history.service';
import { DataSource } from '@angular/cdk/collections';
import { HistoryElement } from './mock-home';
import { MessageDialog } from '../common/message-dialog.component';
import { HomeSendService } from './home-send.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// ローディング用
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';

import { NavbarComponent } from '../shared/navbar/navbar.component';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';
import { User } from '../shared/user/user';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit, AfterViewInit {

  txControl: FormControl = new FormControl();

  loginUser: User;
  assets: number;
  toUser: string;
  amount = 0;
  message: string;
  check: boolean;
  displayedColumns: string[];
  dataSource: MatTableDataSource<HistoryElement>;
  form: FormGroup;
  filteredUsers: Observable<User[]>;
  private apiUrlUser = `${environment.apiUrl}/User`;
  private apiUrlTransferCoin = `${environment.apiUrl}/TransferCoin`;
  private apiUrlWallet = `${environment.apiUrl}/Wallet/`;
  private apiUrlTransaction = `${environment.apiUrl}/queries/selectTransaction`;
  headers: Headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
  options: RequestOptions = new RequestOptions({ headers: this.headers });

  // ローディング用
  spinner = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  });

  @ViewChild(MatSort) sort: MatSort;

  constructor(private homecheckservice: HomeCheckService,
    private sessionservice: SessionService,
    private dialog: MatDialog,
    private homehistoryservice: HomeHistoryService,
    private homesendservice: HomeSendService,
    private changedetectorref: ChangeDetectorRef,
    private formbuilder: FormBuilder,
    private http: Http,
    private httpclient: HttpClient,
    private nav: NavbarComponent,
    private router: Router,
    private overlay: Overlay
  ) {
    this.form = formbuilder.group({
      name: formbuilder.group({
        toUser: '',
        amount: '',
        message: '',
      }),
    });
  }

  ngOnInit() {
    // ロード表示開始
    this.spinner.attach(new ComponentPortal(MatSpinner));

    this.message='';
    this.loginUser = this.sessionservice.session.user;
    this.assets = this.homecheckservice.assetsCheck(this.loginUser.id);
    this.displayedColumns = this.homehistoryservice.getDisplayColumns();
    this.homehistoryservice.getDataSource()
      .subscribe(
        response => {
          this.dataSource = this.homehistoryservice.getDataSourceByUser(this.loginUser.id, response);
          // ロード表示終了
          this.spinner.detach();
      });

    this.filteredUsers = this.txControl.valueChanges
      .pipe(
        startWith<string | User>(''),
        map(value => typeof value === 'string' ? value : value.id),
        map(name => name ? this.filterUser(name)
          : this.sessionservice.session.users.filter(u => u.id !== this.sessionservice.session.user.id))
      );
    
  }  

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

  onKeyTo(toUser: string) {
    this.toUser = toUser;
  }

  onKeyAmount(amount: number) {
    this.amount = amount;
  }

  onKeyMessage(message: string) {
    this.message = message;
  }

  openDialog() {
    const toUser: string = this.getDisplayUserValue(this.txControl.value);

    const dialogRef = this.dialog.open(HomeDialogComponent, {
      width: '500px',
      data: { toUser: toUser, amount: this.amount, message: this.message }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.check = result;
      if (this.check) {
        // this.postData.sender += this.loginUser;
        // this.postData.receiver += this.toUser;
        // this.postData.amount = this.amount;
        // this.postData.message = this.message;

        const test = {
          '$class': 'jp.co.itone.model.TransferCoin',
          'sender': 'resource:jp.co.itone.model.Wallet#' + this.loginUser.id,
          'receiver': 'resource:jp.co.itone.model.Wallet#' + this.txControl.value.id,
          'amount': '' + this.amount,
          'message': '' + this.message
        };

        
        // ロード表示開始
        this.spinner.attach(new ComponentPortal(MatSpinner));

        this.http.post(this.apiUrlTransferCoin, JSON.stringify(test), this.options)
          .subscribe(
            res => {
              this.sessionservice.login(this.loginUser);
              this.homehistoryservice.getDataSource().subscribe(response => {
                this.dataSource = this.homehistoryservice.getDataSourceByUser(this.loginUser.id, response);
              });
              // ロード表示終了
              this.spinner.detach();
            },
            error => {
              console.log('error is ' + error);
              // ロード表示終了
              this.spinner.detach();
              alert('送金できません。');
            }
          );
          this.form.reset();
          this.toUser='';
          this.amount=0;
          this.message='';
      }
    });
  }

  openMessageDialog(message: string) {
    const dialogRef = this.dialog.open(MessageDialog, {
      width: '500px',
      data: { messageDisp: message }
    });
  }

  onClickSend() {

    // ロード表示開始
    this.spinner.attach(new ComponentPortal(MatSpinner));

    this.amount=this.homecheckservice.amountCheck(this.amount);

    this.httpclient.get<ApiWalletResponse>(this.apiUrlWallet + this.loginUser.id).subscribe(
      response => {
        if (response.amount >= this.amount && this.amount !== 0) {
          this.message = this.homecheckservice.messageCheck(this.message);
          // ロード表示終了
          this.spinner.detach();
          this.openDialog();
        } else {
          // ロード表示終了
          this.spinner.detach();
          alert('不正な金額です。');
        }
      });
  }

  getDisplayUserValue(user?: User): string | undefined {
    return user ? user.lastName + user.firstName + '（' + user.id + '）' : undefined;
  }

  private filterUser(val: string): User[] {
    return this.sessionservice.session.users
      .filter(u => u.id.indexOf(val) === 0 || u.firstName.indexOf(val) === 0 || u.lastName.indexOf(val) === 0)
      .filter(u => u.id !== this.sessionservice.session.user.id);

  }

}

export interface PostData {
  $class: string;
  sender: string;
  receiver: string;
  amount: number;
  message: string;
}

interface ApiWalletResponse {
  amount: number;
}
