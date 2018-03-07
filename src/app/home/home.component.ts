import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {MatTableDataSource,MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import { HomeCheckService } from './home-check.service';
import { SessionService,Session } from '../shared/session/session.service';
import { HomeDialogComponent } from './home-dialog.component';
import { HomeHistoryService } from './home-history.service';
import { DataSource } from '@angular/cdk/collections';
import { HistoryElement } from './mock-home';
import {MessageDialog} from '../common/message-dialog.component';
import { HomeSendService } from './home-send.service';
import {NotificationsService} from 'angular4-notify';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent  implements OnInit {
   
  loginUser: string;
  assets: number;
  toUser: string;
  amount: number;
  message: string;
  check: boolean;
  displayedColumns: string[];
  dataSource: MatTableDataSource<HistoryElement>; 
  form: FormGroup;

  constructor(private homecheckservice: HomeCheckService,
              private sessionservice: SessionService,
              private dialog: MatDialog,
              private homehistoryservice: HomeHistoryService,
              private homesendservice: HomeSendService,
              private changedetectorref:ChangeDetectorRef,
              private notificationsService: NotificationsService,
              private formbuilder: FormBuilder,
            ) {
              this.form = formbuilder.group({
                name: formbuilder.group({
                  toUser:'',
                  amount: '',
                  message: '',
                }),
              })  
               }

  ngOnInit(){
    this.loginUser = this.sessionservice.session.user;
    this.assets = this.homecheckservice.assetsCheck(this.loginUser);
    this.displayedColumns = this.homehistoryservice.getDisplayColumns();
    this.dataSource = this.homehistoryservice.getDataSource(this.loginUser);
    this.notificationsService.addInfo('test');
  }

  onKeyTo(toUser: string){
    this.toUser = toUser;
    console.log('this.toUser is ' + this.toUser);
  }

  onKeyAmount(amount: number){
    this.amount = amount;
    console.log('this.amount is ' + this.amount);
  }

  onKeyMessage(message: string){
    this.message = message;
    console.log('this.message is ' + this.message);
  }

  openDialog(){
    let dialogRef = this.dialog.open(HomeDialogComponent, {
      width: '500px',
      data: {toUser: this.toUser, amount: this.amount, message: this.message}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.check = result;
      console.log('The dialog was closed this.check is ' + this.check);
      if(this.check){
        if(this.homesendservice.send(this.loginUser,this.toUser,this.amount,this.message)){
          alert('送金に成功しました。');
          this.form.reset();
          this.changedetectorref.detectChanges();
        }  
      }
    });

  }

  openMessageDialog(message:string) {
    let dialogRef = this.dialog.open(MessageDialog, {
      width: '500px',
      data: { messageDisp: message}
    });
  }


  onClickSend(){
    if(this.homecheckservice.toCheck(this.toUser)){
      if(this.homecheckservice.amountCheck(this.loginUser,this.amount)){
        this.message = this.homecheckservice.messageCheck(this.message);
        console.log('this.message is ' + this.message);
        this.openDialog();
      }
      else{
        alert('不正な金額です。');
      }
    }
    else{
      alert('送金先ユーザーIDが見つかりません。');
    }
  }
}

