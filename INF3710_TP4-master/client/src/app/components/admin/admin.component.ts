import { Component, OnInit } from '@angular/core';
// import { MoviesGridComponent } from '../movies-grid/movies-grid.component'
// import { MembersGridComponent } from '../members-grid/members-grid.component'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public gridToShow: string = "films";

  onToggle(grid: string){
    console.log(grid);
    this.gridToShow = grid;
  }

}
