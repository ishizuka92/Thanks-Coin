import { Component, OnInit, ChangeDetectorRef,AfterViewInit,ViewChild} from '@angular/core';
import {MatTableDataSource,MatDialog,MatDialogRef,MAT_DIALOG_DATA,MatSort} from '@angular/material';
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
import { HttpClient } from '@angular/common/http';
import { Http,RequestOptions,Headers,Response } from "@angular/http";
import { Observable } from 'rxjs';
import { NavbarComponent } from'../shared/navbar/navbar.component';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent  implements OnInit {
   
  loginUser: string;
  assets: number;
  toUser: string;
  amount: number = 0;
  message: string;
  check: boolean;
  displayedColumns: string[];
  dataSource: MatTableDataSource<HistoryElement>; 
  form: FormGroup;
  private apiUrlUser ='http://10.133.210.147:3000/api/User';
  private apiUrlTransferCoin = 'http://10.133.210.147:3000/api/TransferCoin';
  private apiUrlWallet ='http://10.133.210.147:3000/api/Wallet/';
  private apiUrlTransaction ='http://10.133.210.147:3000/api/queries/selectTransaction';
  headers: Headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
  options: RequestOptions = new RequestOptions({ headers: this.headers });
  // postData:PostData ={
  //   $class:"jp.co.itone.model.TransferCoin",
  //   sender:"resource:jp.co.itone.model.Wallet#",
  //   receiver:"resource:jp.co.itone.model.Wallet#",
  //   amount:0,
  //   message:"" };
  

  constructor(private homecheckservice: HomeCheckService,
              private sessionservice: SessionService,
              private dialog: MatDialog,
              private homehistoryservice: HomeHistoryService,
              private homesendservice: HomeSendService,
              private changedetectorref:ChangeDetectorRef,
              private notificationsService: NotificationsService,
              private formbuilder: FormBuilder,
              private http:Http,
              private httpclient:HttpClient,
              private nav:NavbarComponent,
              private router: Router,
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
    //this.dataSource = this.homehistoryservice.getDataSource(this.loginUser);
    //this.notificationsService.addInfo('test');
    this.homehistoryservice.getDataSource().subscribe(response =>{
      this.dataSource = this.homehistoryservice.getDataSourceByUser(this.loginUser,response);
    });
    
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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
        // this.postData.sender += this.loginUser;
        // this.postData.receiver += this.toUser;
        // this.postData.amount = this.amount;
        // this.postData.message = this.message;
        let test={
          "$class": "jp.co.itone.model.TransferCoin", 
          "sender": "resource:jp.co.itone.model.Wallet#"+this.loginUser, 
          "receiver": "resource:jp.co.itone.model.Wallet#"+this.toUser, 
          "amount": ""+this.amount, 
          "message": ""+this.message
        };
        console.log(JSON.stringify(test));
        this.http.post(this.apiUrlTransferCoin,JSON.stringify(test),this.options)
          .subscribe(
            result => {
              console.log('result is '+result);
              this.sessionservice.login(this.loginUser);
              this.homehistoryservice.getDataSource().subscribe(response =>{
                this.dataSource = this.homehistoryservice.getDataSourceByUser(this.loginUser,response);
              });              
            },
            error => console.log('error is '+error)
          );
        // .map(this.extractData)
        // .catch(this.handleErrorObservable);
        //if(this.homesendservice.send(this.loginUser,this.toUser,this.amount,this.message)){
          alert('送金に成功しました。');
          this.form.reset();
          //this.router.navigate(['main']);
          //selector: 'app-main';
          //this.nav.ngOnInit();
          //this.changedetectorref.detectChanges();
        //}  
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
    let check: boolean = true;
    console.log('click send');
    this.httpclient.get(this.apiUrlUser).subscribe(responseuser => {
      for(let u in responseuser){
        console.log('this.toUser is '+this.toUser);
        console.log('responseuser[u].id is '+responseuser[u].id);
        if(this.toUser == responseuser[u].id){
          check = false;
          this.httpclient.get<ApiWalletResponse>(this.apiUrlWallet+this.loginUser).subscribe(response => {
            if( response.amount >= this.amount && this.amount != 0 ){
              this.message = this.homecheckservice.messageCheck(this.message);
              this.openDialog();
            }
            else{
              alert('不正な金額です。');
            }
          });
        }
      }
      if(check){
        alert('送金先ユーザーIDが見つかりません。');
      }
    });
  }

  // onClickSend(){
  //   if(this.homecheckservice.toCheck(this.toUser)){
  //     if(this.homecheckservice.amountCheck(this.loginUser,this.amount)){
  //       this.message = this.homecheckservice.messageCheck(this.message);
  //       console.log('this.message is ' + this.message);
  //       this.openDialog();
  //     }
  //     else{
  //       alert('不正な金額です。');
  //     }
  //   }
  //   else{
  //     alert('送金先ユーザーIDが見つかりません。');
  //   }

  // private extractData(res: Response) {
  //   let body = res.json();
  //   return body || {};
  // }

  // private handleErrorObservable (error: Response | any) {
  //   console.error(error.message || error);
  //   return Observable.throw(error.message || error);
  // }

}

export interface PostData{
  $class: string;
  sender: string;
  receiver: string;
  amount: number;
  message: string;
}

interface ApiWalletResponse {
  amount: number;
}