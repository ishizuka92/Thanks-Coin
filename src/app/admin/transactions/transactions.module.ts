import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ここ追記
import { TransactionsComponent } from './transactions.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule
  ],
  
  declarations: [TransactionsComponent],
  exports: [TransactionsComponent]
})
export class TransactionsModule { }
