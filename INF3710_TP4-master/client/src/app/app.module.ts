import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { HotelComponent } from "./hotel/hotel.component";
import { RoomComponent } from "./room/room.component";
import { AdminComponent } from './components/admin/admin.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MembreComponent } from './components/membre/membre.component';
import { MembreGridComponent } from './components/membre-grid/membre-grid.component';
import { ModalsComponent } from './components/modals/modals.component';
import { MoviesGridComponent } from './components/movies-grid/movies-grid.component';
import { AddMovieModalComponent } from './components/modals/add-movie-modal/add-movie-modal.component';
import { AddParticpantModalComponent } from './components/modals/add-particpant-modal/add-particpant-modal.component';
import { EditModalComponent } from './components/modals/edit-modal/edit-modal.component';
import { ErrorModalComponent } from './components/modals/error-modal/error-modal.component';
import { SignUpModalComponent } from './components/modals/sign-up-modal/sign-up-modal.component';
import { ViewMovieModalComponent } from './components/modals/view-movie-modal/view-movie-modal.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    HotelComponent,
    AdminComponent,
    HomepageComponent,
    MembreComponent,
    MembreGridComponent,
    ModalsComponent,
    MoviesGridComponent,
    AddMovieModalComponent,
    AddParticpantModalComponent,
    EditModalComponent,
    ErrorModalComponent,
    SignUpModalComponent,
    ViewMovieModalComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
