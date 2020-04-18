import { Component, OnInit } from "@angular/core";
import { HomepageComponent } from "../homepage/homepage.component";
// import { AdminComponent } from "../admin/admin.component";
import { Routes } from "@angular/router";
import { FilmssComponent } from "../filmss/filmss.component";
import { NewFilmComponent } from "../new-film/new-film.component";
import { UpdateComponentComponent } from "../update-component/update-component.component";

export const appRoutes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomepageComponent },
  { path: "admin", component: FilmssComponent },
  // { path: "admin", component: AdminComponent },
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
