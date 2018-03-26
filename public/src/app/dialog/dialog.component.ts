import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent{

 
success;
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      if(data.msgCode == 'S'){
        data.messageHdrCls = 'primary';
        data.messageIcon = 'done';
        data.messageType = 'Success';
        this.success=true;
      }else{
        data.messageHdrCls = 'warn';
        data.messageIcon = 'clear';
        data.messageType =  'Error';
        this.success=false;
      }
    }

  onNoClick(): void {
    this.dialogRef.close(this.success);
  }

}
