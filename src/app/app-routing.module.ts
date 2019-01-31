import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';
import { PasswordComponent } from './password/password.component';
import { RankingComponent } from './ranking/ranking.component';
import { TransactionsComponent } from './admin/transactions/transactions.component';
import { UsersComponent } from './admin/users/users.component';
import { MainComponent } from './main/main.component';
import { SessionService } from './shared/session/session.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [SessionService]
  },
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [SessionService]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'password',
    component: PasswordComponent,
    canActivate: [SessionService]
  },
  {
    path: 'ranking',
    component: RankingComponent,
    canActivate: [SessionService]
  },
  {
    path: 'admin/transactions',
    component: TransactionsComponent,
    canActivate: [SessionService]
  },
  {
    path: 'admin/users',
    component: UsersComponent,
    canActivate: [SessionService]
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [SessionService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
