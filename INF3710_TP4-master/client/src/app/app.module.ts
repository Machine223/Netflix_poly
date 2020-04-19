import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent, appRoutes } from "./components/app/app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatNativeDateModule
} from "@angular/material";
import { MatMenuModule } from "@angular/material/menu";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { EditModalComponent } from "./components/modals/edit-modal/edit-modal.component";
import { FormsModule } from "@angular/forms";
import { ErrorModalComponent } from "./components/modals/error-modal/error-modal.component";
import { ViewMovieModalComponent } from "./components/modals/view-movie-modal/view-movie-modal.component";
import { AddMovieModalComponent } from "./components/modals/add-movie-modal/add-movie-modal.component";
import { AddParticipantModalComponent } from "./components/modals/add-participant-modal/add-participant-modal.component";
import { SignUpModalComponent } from "./components/modals/sign-up-modal/sign-up-modal.component";
import { StartingPageComponent } from "./components/homepage/StartingPage.component";
import { RouterModule } from "@angular/router";
import { CommunicationService } from "./components/services/communication-service/communication.service";
import { MemberService } from "./components/services/member-service/memberService";
import { FilmsComponent } from "./components/films/films.component";
import { MatListModule } from "@angular/material/list";
import { NewFilmComponent } from "./components/new-film/new-film.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { UpdateComponentComponent } from './components/update-component/update-component.component';

@NgModule({
  declarations: [
    AppComponent,
    EditModalComponent,
    ErrorModalComponent,
    ViewMovieModalComponent,
    AddMovieModalComponent,
    AddParticipantModalComponent,
    SignUpModalComponent,
    StartingPageComponent,
    FilmsComponent,
    NewFilmComponent,
    UpdateComponentComponent
  ],
  imports: [
    MatListModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    RouterModule,
    MatGridListModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    RouterModule.forRoot(appRoutes),
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    MatDialogModule,
    CommunicationService,
    MemberService,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EditModalComponent,
    ErrorModalComponent,
    ViewMovieModalComponent,
    AddMovieModalComponent,
    AddParticipantModalComponent,
    SignUpModalComponent
  ]
})
export class AppModule {}
