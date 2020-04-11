import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.scss']
})
export class SignUpModalComponent implements OnInit {
  firstName: string = "";
  lastName: string = "";
  emailAddress: string = "";
  adressNumber: number;
  streetName: string = "";
  appartmentNumber: string = "";
  postalCode: string = "";
  city: string = "";
  monthly: boolean;
  creditCardNum: number;
  expirationMonth: number;
  expirationYear: number;
  ccv: number;
  password: string;
  confirmation: string;

  constructor(private dialogRef: MatDialogRef<SignUpModalComponent>, public errorDialog: MatDialog) {}

  ngOnInit() { }

  signUp() {
    if (this.checkIfValid()) {
      //TODO: DATABASE CALL (CREATE NEW MEMBER)
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

  checkIfValid(): boolean {
    let isValid: boolean = true;

    isValid = isValid && (this.firstName !== "");
    console.log(isValid);
    isValid = isValid && (this.lastName !== "");
    console.log(isValid);
    isValid = isValid && (this.streetName !== "");
    console.log(isValid);
    isValid = isValid && (this.city != "")
    console.log(isValid);
    isValid = isValid && (this.monthly !== null);
    console.log(isValid);

    let regexp1 = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    isValid = isValid && regexp1.test(this.emailAddress);
    console.log(isValid);
    let regexp2 = new RegExp(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/);
    isValid = isValid && regexp2.test(this.postalCode);
    console.log(isValid);

    isValid = isValid && (this.adressNumber !== null) && (Number.isInteger(this.adressNumber));
    console.log(isValid);
    isValid = isValid && (this.creditCardNum !== null) && (Number.isInteger(this.creditCardNum)) && (this.creditCardNum.toString().length === 16);
    console.log(isValid);
    isValid = isValid && (this.expirationMonth !== null) && (Number.isInteger(this.expirationMonth)) && (this.expirationMonth >= 1 && this.expirationMonth <= 12);
    console.log(isValid);
    isValid = isValid && (this.expirationYear !== null) && (Number.isInteger(this.expirationYear));
    console.log(isValid);
    isValid = isValid && (this.ccv !== null) && (Number.isInteger(this.expirationYear)) && (this.creditCardNum.toString().length === 3);
    console.log(isValid);
    isValid = isValid && this.password === this.confirmation;
    console.log(isValid);

    return isValid;
  }

}
