import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { } from '../edit-modal/edit-modal.component';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

@Component({
  selector: 'app-add-movie-modal',
  templateUrl: './add-movie-modal.component.html',
  styleUrls: ['./add-movie-modal.component.scss']
})
export class AddMovieModalComponent implements OnInit {
  newTitle: string = "";
  newGenre: string = "";
  newDuration: number;
  newDirector: string = "";
  newProdYear: number;
  genres: string[] = ["Action", "Animation", "Comédie", "Documentaire", "Drame", "Fantastique", "Historique", "Policier", "Science-fiction", "Sport"];
  
  constructor(public errorDialog: MatDialog, private dialogRef: MatDialogRef<AddMovieModalComponent>) {}

  ngOnInit() {}

  confirmAdd() {
    if(this.newTitle !== "" && this.newDuration > 0 && this.newProdYear > 1890) {

      // TODO : DATABASE CALL (ADD MOVIE)
      
      this.dialogRef.close();

    } else {  
      this.errorDialog.open(ErrorModalComponent, {
        data: "Veuillez entrer des valeurs valides!"
      });
    }
  }

}
