import { Component, OnInit } from "@angular/core";
import { Film } from "../../../../../common/tables/Film";
import { CommunicationService } from "../services/communication-service/communication.service";
import { DataService } from "../Services/data.service";
import { Router } from "@angular/router";
import { MovieApiService } from "../Services/movie-api/movie-api.service";

@Component({
  selector: "app-films",
  templateUrl: "./films.component.html",
  styleUrls: ["./films.component.scss"]
})
export class FilmsComponent implements OnInit {
  bannerApiData:any = [];
  trendingApiData:any = [];
  moviesApiData:any = [];

  constructor(
    public communicationService: CommunicationService,
    private tmdbApiService: MovieApiService,
    public data: DataService,
    public router: Router
  ) {}

  ngOnInit() {
    this.bannerData();
    this.trendingData();
  }

  bannerData() {
    this.tmdbApiService.bannerApiData().subscribe((res)=>{
      this.bannerApiData = res.results;
    })
  }

  trendingData(){
    this.tmdbApiService.trendingMovieApiData().subscribe((res)=>{
      this.trendingApiData = res.results;
    })
  }

  searchMovieData(searchInput:any){
    console.log('search Key',searchInput);

    this.tmdbApiService.getSearchMovie(searchInput).subscribe((res)=>{
      console.log(res.results, 'searchmovie##');
      this.moviesApiData = res.results;
    })
  }

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
    this.communicationService
      .deleteMovie(this.movies[idx].filmID)
      .subscribe((resp: any) => {
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

  wip() {
    alert("la fonctionnalité n'est pas encore implementé");
  }
}
