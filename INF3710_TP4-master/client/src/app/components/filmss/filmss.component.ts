import { Component, OnInit } from "@angular/core";
import { Film } from "../../../../../common/tables/Film";
import { CommunicationService } from "../services/communication-service/communication.service";

@Component({
  selector: "app-filmss",
  templateUrl: "./filmss.component.html",
  styleUrls: ["./filmss.component.scss"]
})
export class FilmssComponent implements OnInit {
  constructor(public communicationService: CommunicationService) {}

  ngOnInit() {}

  movies: Film[] = [];
  public getMovies(): void {
    this.communicationService.getMovies().subscribe((movies: Film[]) => {
      this.movies = movies;
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
}
