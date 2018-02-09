import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';
import { PasswordComponent } from './password/password.component';
import { RankingComponent } from './ranking/ranking.component';
import { TransactionsComponent } from './admin/transactions/transactions.component';
import { AuthguardService } from './shared/authguard/authguard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'password',
    component: PasswordComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'ranking',
    component: RankingComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    canActivate: [AuthguardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
