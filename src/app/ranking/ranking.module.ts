import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ここ追記
import { RankingComponent } from './ranking.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
  ],
  // ここ追記
  declarations: [RankingComponent],
  exports: [RankingComponent]
})
export class RankingModule { }
