import { Component, OnInit } from "@angular/core";
import { Membre } from "../../Membre";
import { CommunicationService } from "../services/communication-service/communication.service";

@Component({
  selector: "app-members-grid",
  templateUrl: "./members-grid.component.html",
  styleUrls: ["./members-grid.component.scss"]
})
export class MembersGridComponent implements OnInit {

  constructor(private communicationService: CommunicationService) {}

  membres : Membre[] = [];

  public colonnes: string[] = ['ID', 'Nom', 'Courriel', 'Ville', 'Administrateur'];

  ngOnInit() {

    // TODO: DATABASE CALL (GET MOVIE LIST)
    this.communicationService.listen().subscribe((m:any) => {
      console.log(m);
      this.getMembres();
  });

  }
  public getMembres(): void {
    this.communicationService.getMembres().subscribe((membres: Membre[]) => {
        console.log(membres);
        this.membres = membres;
        console.log(this.membres);
    });
  }

}
