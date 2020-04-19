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

  movies: Film[] = [];
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
        console.log("---------------------");
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
