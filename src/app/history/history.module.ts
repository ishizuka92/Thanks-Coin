import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ここ追記
import { HistoryComponent } from './history.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule
  ],
  
  declarations: [HistoryComponent],
  exports: [HistoryComponent]
})
export class HistoryModule { }
