import { Component, OnInit } from "@angular/core";
import { StartingPageComponent } from "../homepage/StartingPage.component";
import { Routes } from "@angular/router";
import { NewFilmComponent } from "../new-film/new-film.component";
import { UpdateComponentComponent } from "../update-component/update-component.component";
import { FilmsComponent } from '../films/films.component';

export const appRoutes: Routes = [
  { path: "", redirectTo: "admin", pathMatch: "full" },
  { path: "home", component: StartingPageComponent },
  { path: "admin", component: FilmsComponent },
  { path: "new", component: NewFilmComponent },
  { path: "update", component: UpdateComponentComponent }
];

@Component({
  selector: "app-component",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
