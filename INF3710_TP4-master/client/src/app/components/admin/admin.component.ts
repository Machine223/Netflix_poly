import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
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
