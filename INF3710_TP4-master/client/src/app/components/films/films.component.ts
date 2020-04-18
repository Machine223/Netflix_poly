import { Component, OnInit } from '@angular/core';
import { Film } from '../../../../../common/tables/Film';
import { CommunicationService } from '../services/communication-service/communication.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  constructor(public communicationService: CommunicationService) { }

  ngOnInit() {
  }

  movies : Film[] = [ {filmID: 1, titre: 'Titanic', genre: "Drame", dureeTotalMinutes: 194, dateProduction: 1997}];
  public getMovies(): void {
    this.communicationService.getMovies().subscribe((movies: Film[]) => {
        this.movies = movies;
    });
    console.log(this.movies);
  }
}
