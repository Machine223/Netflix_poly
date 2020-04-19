import { Injectable } from "@angular/core";
import { Film } from "../../../../../common/tables/Film";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor() {}
  public movies: Film[] = [];
  public selectedMovie: Film;
}
