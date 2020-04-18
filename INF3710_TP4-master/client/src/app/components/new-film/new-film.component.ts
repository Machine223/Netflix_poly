import { Component, OnInit } from "@angular/core";
import { CommunicationService } from "../services/communication-service/communication.service";
import { Film } from "../../../../../common/tables/Film";
import { Router } from "@angular/router";

@Component({
  selector: "app-new-film",
  templateUrl: "./new-film.component.html",
  styleUrls: ["./new-film.component.scss"]
})
export class NewFilmComponent implements OnInit {
  titre = "";
  genre = "";
  duree = "";
  annee = "";
  date: Date;
  constructor(
    public communication: CommunicationService,
    private router: Router
  ) {}

  ngOnInit() {}

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
      filmID: -1,
      genre: this.genre,
      titre: this.titre,
      dateProduction: Date.parse(time),
      dureeTotalMinutes: parseInt(this.duree)
    };
    this.communication.addFilm(film).subscribe(lol => {
      alert(lol);
    });
  }
  annuler() {
    this.router.navigateByUrl("/films");
  }
}
