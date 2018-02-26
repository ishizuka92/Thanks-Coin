import { Component, Inject } from '@angular/core';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'home-dialog',
    templateUrl: './home-dialog.component.html'
})

export class HomeDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<HomeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
    
    // onClickYes(): void{
    //     this.dialogRef.close(true);
    // }

    // onClickNo(): void{
    //     this.dialogRef.close(false);
    // }

}