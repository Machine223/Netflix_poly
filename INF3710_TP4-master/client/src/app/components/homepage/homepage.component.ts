import { Component, OnInit } from '@angular/core';
//import { Member } from 'src/app/member';
import { Router} from '@angular/router';
import { MatDialog } from '@angular/material';
import { ErrorModalComponent } from '../modals/error-modal/error-modal.component';
import { MemberService } from "../services/member-service/memberService";
import { SignUpModalComponent } from '../modals/sign-up-modal/sign-up-modal.component';
import { CommunicationService } from '../services/communication-service/communication.service'
import { Membre } from "../../Membre";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public activeMember: Membre | null = null;
  public password: string = "";
  public loginEmailAddress: string = "";

  constructor(public router: Router, public errorDialog: MatDialog, public signUpDialog: MatDialog, public communicationService: CommunicationService, private memberService: MemberService) {}

  ngOnInit() {}

  signUp() {
    this.signUpDialog.open(SignUpModalComponent);
  }

  
  logIn() {
    if (this.communicationService.getDBcreated()) {
      let isValid: boolean = false;
      this.communicationService.login(this.loginEmailAddress, this.password).subscribe((membres: Membre[]) => {
          isValid = membres.length > 0 ? true : false;
          if (isValid) {
            if (membres[0].isAdmin) {
              this.activeMember = new Membre(
                membres[0].membreID, membres[0].nom, membres[0].courriel,
                membres[0].motDePasse, membres[0].adressePostal, membres[0].isAdmin);
              this.memberService.setActiveMember(this.activeMember);
              this.router.navigateByUrl("/admin");
            } else {
              this.activeMember = new Membre(
                membres[0].membreID, membres[0].nom, membres[0].courriel,
                membres[0].motDePasse, membres[0].adressePostal, membres[0].isAdmin);
              this.memberService.setActiveMember(this.activeMember);
              this.router.navigateByUrl("/member");
            }
          } else {
            this.errorDialog.open(ErrorModalComponent, {
              data: "Adresse courriel ou mot de passe invalide"
            });
          }
      });
    } else {
        this.errorDialog.open(ErrorModalComponent, {
          data: "Veuillez initialiser la base de données"
        });
      }
}



  public createDB(): void {
    this.communicationService.setUpDatabase().subscribe((res: any) => {
        console.log(res);
    });
    this.communicationService.setDBcreated(true);
  }

  
  // tslint:disable-next-line: typedef
  public logInMember() {
    // TODO: DATABASE CALL (CHECK IF EMAIL ADDRESS AND PASSWORD MATCH)
    // tslint:disable-next-line: no-constant-condition
    if (true) { // TODO: MODIFY WITH CHECK ABOVE
      // tslint:disable-next-line: no-magic-numbers
      this.activeMember = new Membre(2, "ALEX GIBBS", "alexander@gmail.com", "alex1234", "H4A1E1", false);
      this.memberService.setActiveMember(this.activeMember);
      this.router.navigateByUrl("/member");
    } else {
      this.errorDialog.open(ErrorModalComponent, {
        data: "Adresse courriel ou mot de passe invalide"
      });
    }
  }


}

