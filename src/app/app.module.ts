import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MatSortModule } from '@angular/material/sort';

import { AppComponent } from './app.component';
import { HistoryModule } from './history/history.module';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { PasswordComponent } from './password/password.component';
import { RankingModule } from './ranking/ranking.module';
import { TransactionsModule } from './admin/transactions/transactions.module';
import { UsersComponent } from './admin/users/users.component';
import { CreateComponent } from './admin/users/create/create.component';
import { SessionService, Session } from './shared/session/session.service';
import { LoginService } from './login/login.service';
import { HomeCheckService } from './home/home-check.service'
import { PasswordService } from './password/password.service'
import { MessageDialog } from './common/message-dialog.component';
import { HomeDialogComponent } from './home/home-dialog.component';
import { HomeSendService } from './home/home-send.service';
import { HomeHistoryService } from './home/home-history.service';
import { UserService } from './shared/user/user.service';
import { WalletService } from './shared/wallet/wallet.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    NavbarComponent,
    LoginComponent,
    PasswordComponent,
    // TransactionsComponent,
    UsersComponent,
    CreateComponent,
    MessageDialog,
    HomeDialogComponent,
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatAutocompleteModule,
    AppRoutingModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    MatGridListModule,
    FlexLayoutModule,
    HttpClientModule,
    HttpModule,
    MatSortModule,
    TransactionsModule,
    HistoryModule,
    RankingModule
  ],
  providers: [
    SessionService,
    Session,
    LoginService,
    HomeCheckService,
    PasswordService,
    HomeSendService,
    HomeHistoryService,
    NavbarComponent,
    UserService,
    WalletService
  ],
  entryComponents: [MessageDialog, HomeDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
