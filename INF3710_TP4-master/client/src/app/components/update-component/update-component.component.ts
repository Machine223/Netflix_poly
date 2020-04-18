import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../Services/data.service";
import { CommunicationService } from "../services/communication-service/communication.service";
import { Film } from "../../../../../common/tables/Film";

@Component({
  selector: "app-update-component",
  templateUrl: "./update-component.component.html",
  styleUrls: ["./update-component.component.scss"]
})
export class UpdateComponentComponent implements OnInit {
  titre = "";
  genre = "";
  duree = "";
  date: Date;
  constructor(
    public communication: CommunicationService,
    private router: Router,
    public data: DataService
  ) {}

  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    this.titre = this.data.selectedMovie.titre;
    this.genre = this.data.selectedMovie.genre;
    this.date = new Date(this.data.selectedMovie.dateProduction);
    this.duree = this.data.selectedMovie.dureeTotalMinutes.toString();
  }

  saveFilm() {
    let isnum = /^\d+$/.test(this.duree);
    if (!this.titre || !this.genre || !this.duree || !this.date) {
      alert("Les entrees ne sont pas valides veuillez recommencer!");
      return;
    }
    if (!isnum) {
      alert("veuillez rentrer un nombre dans la duree");
      return;
    }

    let time = this.date.toDateString();
    let film: Film = {
      filmID: this.data.selectedMovie.filmID,
      genre: this.genre,
      titre: this.titre,
      dateProduction: Date.parse(time),
      dureeTotalMinutes: parseInt(this.duree)
    };
    this.communication.modifyFilm(film).subscribe(lol => {
      alert("Modifié avec succès");
      this.router.navigateByUrl("/films");
    });
  }
  annuler() {
    this.router.navigateByUrl("/films");
  }
}
