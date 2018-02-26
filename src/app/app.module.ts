import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material';

import { AppComponent } from './app.component';
import { HistoryComponent } from './history/history.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { PasswordComponent } from './password/password.component';
import { RankingComponent } from './ranking/ranking.component';
import { TransactionsComponent } from './admin/transactions/transactions.component';
import { UsersComponent } from './admin/users/users.component';
import { CreateComponent } from './admin/users/create/create.component';
import { SessionService,Session } from './shared/session/session.service';
import { LoginService } from './login/login.service';
import { HomeCheckService } from './home/home-check.service'
import { PasswordService } from './password/password.service'
import { MessageDialog } from './common/message-dialog.component';
import { HomeDialogComponent } from './home/home-dialog.component';
import { HomeSendService } from './home/home-send.service';
import { HomeHistoryService } from './home/home-history.service';

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    HomeComponent,
    MainComponent,
    NavbarComponent,
    LoginComponent,
    PasswordComponent,
    RankingComponent,
    TransactionsComponent,
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
  ],
  providers: [
    SessionService,
    Session,
    LoginService,
    HomeCheckService,
    PasswordService,
    HomeSendService,
    HomeHistoryService,
  ],
  entryComponents: [MessageDialog,HomeDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
