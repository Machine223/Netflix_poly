import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

export interface DialogData {
  title: string;
  genre: string;
  duration: number;
  director: string;
  prodYear: number;
}

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  newTitle: string = this.data.title;
  newGenre: string = this.data.genre;
  newDuration: number = this.data.duration;
  newDirector: string = this.data.director;
  newProdYear: number = this.data.prodYear;
  genres: string[] = ["Action", "Animation", "Comédie", "Documentaire", "Drame", "Fantastique", "Historique", "Policier", "Science-fiction", "Sport"];
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public errorDialog: MatDialog, private dialogRef: MatDialogRef<EditModalComponent>) {}

  ngOnInit() {}

  confirmEdit() {
    if(this.newTitle !== "" && this.newDuration > 0 && this.newProdYear > 1890) {

      // TODO : DATABASE CALL (EDIT MOVIE)

      this.dialogRef.close();

    } else {  
      this.errorDialog.open(ErrorModalComponent, {
        data: "Veuillez entrer des valeurs valides!"
      });
    }
  }
}
