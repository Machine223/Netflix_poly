import { Component, OnInit } from '@angular/core';
import { HomepageComponent } from '../homepage/homepage.component';
import { MemberComponent } from '../member/member.component';
import { AdminComponent } from '../admin/admin.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [  
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent},
  { path: 'member', component: MemberComponent },
  { path: 'admin', component: AdminComponent },
];

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
