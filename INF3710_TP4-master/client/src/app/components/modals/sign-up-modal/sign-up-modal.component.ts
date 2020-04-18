import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { Membre } from 'src/app/Membre';
import { CommunicationService } from '../../services/communication-service/communication.service';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.scss']
})
export class SignUpModalComponent implements OnInit {
  iterationNumber: number;
  firstName: string = "";
  lastName: string = "";
  emailAddress: string = "";
  postalCode: string = "";
  city: string = "";
  monthly: boolean;
  creditNumber: number;
  expirationMonth: number;
  expirationYear: number;
  ccv: number;
  password: string;
  confirmation: string;
  currentMembre: Membre;

  constructor(private dialogRef: MatDialogRef<SignUpModalComponent>, 
              public errorDialog: MatDialog, 
              private communicationService: CommunicationService) {
    this.iterationNumber = 0;
    }

  ngOnInit() { }

  createCurrentMember(){
    this.currentMembre = new Membre(this.iterationNumber, `${this.firstName} ${this.lastName}`, this.password, this.emailAddress, this.postalCode, false,);
    this.iterationNumber += 1;
  }

  public addNewMembre(newMembre: Membre): void {
    this.communicationService.addMembre(newMembre).subscribe((res: number) => {
        console.log(res);
        if (res > 0) {
          this.communicationService.filter("update");
        }
    });
  }

  checkIfValid(): boolean {
    let isValid: boolean = true;
    
    isValid = isValid && (this.firstName !== "");
    
    isValid = isValid && (this.lastName !== "");
    
    isValid = isValid && (this.city != "");
    
    isValid = isValid && (this.monthly !== null);
    
    let regexp1 = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    
    isValid = isValid && regexp1.test(this.emailAddress);
    
    let regexp2 = new RegExp(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/);
    
    isValid = isValid && regexp2.test(this.postalCode);
    
    isValid = isValid && (this.creditNumber.toString() != "");
    
    console.log(this.creditNumber);
    isValid = isValid && (this.expirationMonth !== null) && (this.expirationMonth >= 1 && this.expirationMonth <= 12);
    
    isValid = isValid && (this.expirationYear !== null);
    
    isValid = isValid && (this.ccv !== null) && (this.creditNumber.toString()!= "");
    
    isValid = isValid && this.password === this.confirmation;
    
    this.createCurrentMember();
    return isValid;
  }

  signUp() {
    if (this.checkIfValid()) {
      this.addNewMembre(this.currentMembre)
      this.dialogRef.close();
    } else if (this.password === this.confirmation) {
      this.errorDialog.open(ErrorModalComponent, {
        data: "Veuillez remplir chacun des champs"
      })
    } else {
      this.errorDialog.open(ErrorModalComponent, {
        data: "Le mot de passe n'est pas le même dans les deux champs!"
      })
    }
  }

}
