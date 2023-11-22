import { Component, OnInit } from "@angular/core";
import { Film } from "../../../../../common/tables/Film";
import { CommunicationService } from "../services/communication-service/communication.service";
import { DataService } from "../Services/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-films",
  templateUrl: "./films.component.html",
  styleUrls: ["./films.component.scss"]
})
export class FilmsComponent implements OnInit {
  constructor(
    public communicationService: CommunicationService,
    public data: DataService,
    public router: Router
  ) {}

  ngOnInit() {}

//   INSERT INTO Film(titre, genre, dateProduction, dureeTotalMinutes)
// VALUES
// ('Jurassic World', 'action', DATE'2015-01-01', 120),
// ('E.T. the Extra-Terrestrial ', 'action',  DATE'1982-01-01', 132),
// ('Indiana Jones :Temple of Doom', 'action', DATE'1984-01-01', 140),
// ('Men in black 3', 'comedie',  DATE'2008-01-01', 132),
// ('Empire of the Sun', 'action',  DATE'1987-01-01', 153),
// ('JOKER', 'drame', DATE'2019-01-01', 143),
// ('Parasite', 'romance', DATE'2019-01-01', 150);

  movies: Film[] = [{
    filmID: 1,
    titre: 'The Hunger Games: The Ballad of Songbirds & Snakes',
    genre: 'action',
    dureeTotalMinutes: 120,
    dateProduction: '2015-01-01'
  },
  {
    filmID: 2,
    titre: 'E.T. the Extra-Terrestrial',
    genre: 'action',
    dureeTotalMinutes: 132,
    dateProduction: '2015-01-01'
  },
  {
    filmID: 3,
    titre: 'Thor: Love and Thunder',
    genre: 'action',
    dureeTotalMinutes: 140,
    dateProduction: '2015-01-01'
  },
  {
    filmID: 4,
    titre: 'Top Gun: Maverick',
    genre: 'action',
    dureeTotalMinutes: 120,
    dateProduction: '2015-01-01'
  },
  {
    filmID: 5,
    titre: 'Men in black 3',
    genre: 'action',
    dureeTotalMinutes: 120,
    dateProduction: '2015-01-01'
  },
  {
    filmID: 6,
    titre: 'JOKER',
    genre: 'action',
    dureeTotalMinutes: 120,
    dateProduction: '2015-01-01'
  },
  {
    filmID: 7,
    titre: 'Jurassic World',
    genre: 'action',
    dureeTotalMinutes: 120,
    dateProduction: '2015-01-01'
  }];
  public getMovies(): void {
    this.communicationService.getMovies().subscribe((movies: Film[]) => {
      this.movies = movies;
      this.data.movies = movies;
    });
  }

  removeMovie(idx: number) {
    console.log(this.movies[idx].filmID);
    this.communicationService
      .deleteMovie(this.movies[idx].filmID)
      .subscribe((resp: any) => {
        console.log("111111111");
        this.getMovies();
      });
  }

  updateMovie(idx: number) {
    this.data.selectedMovie = this.movies[idx];
    this.router.navigateByUrl("/update");
  }

  reset() {
    this.communicationService.setUpDatabase().subscribe((res: any) => {
      this.communicationService.getMovies().subscribe((movies: Film[]) => {
        this.movies = movies;
        this.data.movies = movies;
      });
    });
    this.communicationService.setDBcreated(true);
  }

  navigateNew() {
    this.router.navigateByUrl("/new");
  }

  lol() {
    alert("la fonctionnalité n'est pas encore implementé");
  }
}
