import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../services/communication-service/communication.service';
import { Membre } from "../../Membre";

@Component({
  selector: 'app-members-grid',
  templateUrl: './members-grid.component.html',
  styleUrls: ['./members-grid.component.scss']
})
export class MembersGridComponent implements OnInit {


  membres : Membre[] = [];


  constructor(private communicationService: CommunicationService) {}

  ngOnInit() {

    // TODO: DATABASE CALL (GET MOVIE LIST)
    this.communicationService.listen().subscribe((m:any) => {
      console.log(m);
      this.getMembres();
  });

  }

  public colonnes: string[] = ['ID', 'Nom', 'Courriel', 'Ville', 'Administrateur'];
  public getMembres(): void {
    this.communicationService.getMembres().subscribe((membres: Membre[]) => {
        console.log(membres);
        this.membres = membres;
        console.log(this.membres)
    });
  }


}
