import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface DialogData {
  id: number,
  title: string,
  genre: string,
  duration: number,
  director: string,
  prodYear: number
}

@Component({
  selector: 'app-view-movie-modal',
  templateUrl: './view-movie-modal.component.html',
  styleUrls: ['./view-movie-modal.component.scss']
})
export class ViewMovieModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dialogRef: MatDialogRef<ViewMovieModalComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
