import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string, private dialogRef: MatDialogRef<ErrorModalComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
