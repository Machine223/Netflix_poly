import { Component, OnInit } from '@angular/core';
import { Classification } from '../../classification';
import { SortType } from 'src/app/enums';
import { Film } from '../../../../../common/tables/Film';
import { MatDialog } from '@angular/material';
import { EditModalComponent } from '../modals/edit-modal/edit-modal.component';
import { ViewMovieModalComponent } from '../modals/view-movie-modal/view-movie-modal.component';
import { CommunicationService } from '../services/communication-service/communication.service';
import { MemberService } from "../services/member-service/memberService";
import { Membre } from "../../Membre";


@Component({
  selector: 'app-movies-grid',
  templateUrl: './movies-grid.component.html',
  styleUrls: ['./movies-grid.component.scss']
})
export class MoviesGridComponent implements OnInit {
  SortType = SortType;

  title: Classification = new Classification("Titre", this.SortType.none);
  genre: Classification = new Classification("Genre", this.SortType.none);
  duration: Classification = new Classification("Durée (min)", this.SortType.none);
  //director: Classification = new Classification("Réalisateur", this.SortType.none);
  prodYear: Classification = new Classification("Année de production", this.SortType.none);
  classifications: Classification[] = [this.title, this.genre, this.duration /*,this.director*/, this.prodYear];
  movies : Film[] = [ {filmID: 1, titre: 'Titanic', genre: "Drame", dureeTotalMinutes: 194, dateProduction: 1997}];

  activeMember: Membre | null;

  constructor(public editDialog: MatDialog,
              public viewMovieDialog: MatDialog,
              private communicationService: CommunicationService,
              private memberService: MemberService) {}

  ngOnInit() {
    this.memberService.obsMember.subscribe((obsMember: Membre | null) => this.activeMember = obsMember);
    // TODO: DATABASE CALL (GET MOVIE LIST)
    this.communicationService.listen().subscribe((m:any) => {
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
        id: movie.filmID,
        title: movie.titre,
        genre: movie.genre,
        duration: movie.dureeTotalMinutes,
        // director: movie.director,
        prodYear: movie.dateProduction
      }
    });
  }

  edit(movie: Film) {
    this.editDialog.open(EditModalComponent, {
      data: {
        title: movie.titre,
        genre: movie.genre,
        duration: movie.dureeTotalMinutes,
        // director: movie.director,
        prodYear: movie.dateProduction
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
