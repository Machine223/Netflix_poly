import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Film } from "src/app/Film";
import { Membre } from 'src/app/Membre';
import { SortType } from "src/app/enums";
import { Classification } from '../../classification';
import { EditModalComponent } from '../modals/edit-modal/edit-modal.component';
import { ViewMovieModalComponent } from '../modals/view-movie-modal/view-movie-modal.component';
import { CommunicationService } from '../services/communication-service/communication.service';
import { MemberService } from "../services/member-service/memberService";

@Component({
  selector: "app-movies-grid",
  templateUrl: "./movies-grid.component.html",
  styleUrls: ["./movies-grid.component.scss"]
})
export class MoviesGridComponent implements OnInit {
  SortType = SortType;

  public title: Classification = new Classification("Titre", this.SortType.none);
  public genre: Classification = new Classification("Genre", this.SortType.none);
  public duration: Classification = new Classification("Durée (min)", this.SortType.none);
  // director: Classification = new Classification("Réalisateur", this.SortType.none);
  public prodYear: Classification = new Classification("Année de production", this.SortType.none);
  public classifications: Classification[] = [this.title, this.genre, this.duration /*,this.director*/, this.prodYear];
  public movies: Film[] = [/*{id: 1, title: 'Titanic', genre: "Drame", duration: 194, director: 'James Cameron', prodYear: 1997}*/];

  public activeMember: Membre | null;

  public constructor(public editDialog: MatDialog, public viewMovieDialog: MatDialog, private communicationService: CommunicationService, private memberService: MemberService) {}

  ngOnInit() {
    this.memberService.obsMember.subscribe((obsMember: Membre | null) => this.activeMember = obsMember);

    // TODO: DATABASE CALL (GET MOVIE LIST)
    this.communicationService.listen().subscribe((m: any) => {
      console.log(m);
      this.getMovies();
  });

  }

  sort(classification: Classification) {
    for (const classif of this.classifications) {
      if (classif === classification) {
        classif.sortType === this.SortType.top ? classif.sortType = this.SortType.bottom : classif.sortType = this.SortType.top;

        // TODO: DATABASE CALL (GET MOVIE LIST GROUPED/RANKED BY CLASSIFICATION)

      } else {
        classif.sortType = this.SortType.none;
      }
    }
  }

  public getMovies(): void {
    this.communicationService.getMovies().subscribe((movies: Film[]) => {
        console.log(movies);
        this.movies = movies;
        console.log(this.movies);
    });
  }

  show(movie: Film) {
    this.viewMovieDialog.open(ViewMovieModalComponent, {
      data: {
        id: movie.ID_film,
        title: movie.titre,
        genre: movie.genre,
        duration: movie.duree_totale_min,
        // director: movie.director,
        prodYear: movie.annee_prod
      }
    });
  }

  edit(movie: Film) {
    this.editDialog.open(EditModalComponent, {
      data: {
        title: movie.titre,
        genre: movie.genre,
        duration: movie.duree_totale_min,
        // director: movie.director,
        prodYear: movie.annee_prod
      }
    });

    // TODO: DATABASE CALL (GET MOVIE LIST GROUPED/RANKED BY CLASSIFICATION)
  }

  delete(movie: Film) {
    // TODO: DATABASE CALL (DELETE MOVIE)

    let index = this.movies.indexOf(movie);
    this.movies.splice(index);
  }

}
