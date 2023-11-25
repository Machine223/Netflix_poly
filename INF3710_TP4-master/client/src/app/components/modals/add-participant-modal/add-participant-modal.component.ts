import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

@Component({
  selector: 'app-add-participant-modal',
  templateUrl: './add-participant-modal.component.html',
  styleUrls: ['./add-participant-modal.component.scss']
})
export class AddParticipantModalComponent implements OnInit {
  newFirstName: string = "";
  newLastName: string = "";
  newRole: string;
  newSex: string = "";
  newAge: number;
  newSalary: number;
  newNationality: string = "";
  roles: string[] = ["Action", "Animation", "Comédie", "Documentaire", "Drame", "Fantastique", "Historique", "Policier", "Science-fiction", "Sport"];
  sexes: string[] = ['M', 'F'];

  constructor(public errorDialog: MatDialog, private dialogRef: MatDialogRef<AddParticipantModalComponent>) { }

  confirmAdd() {
    if(this.newFirstName !== "" && this.newLastName !== "" && this.newRole !== "" && this.newSex !== "" && this.newAge > 0 && this.newAge < 100 && this.newSalary > 0 && this.newNationality !== "") {

      // TODO : DATABASE CALL (ADD PARTICIPANT)
      
      this.dialogRef.close();

    } else {  
      this.errorDialog.open(ErrorModalComponent, {
        data: "Veuillez entrer des valeurs valides!"
      });
    }
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
