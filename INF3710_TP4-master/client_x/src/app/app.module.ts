import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatToolbarModule } from '@angular/material'
import { MatDialogModule } from "@angular/material/dialog";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule} from "@angular/material/menu";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { appRoutes, AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { AdminComponent } from "./components/admin/admin.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { MemberComponent } from "./components/membre/membre.component";
import { AddMovieModalComponent } from "./components/modals/add-movie-modal/add-movie-modal.component";
import { AddParticipantModalComponent } from "./components/modals/add-particpant-modal/add-particpant-modal.component";
import { EditModalComponent } from "./components/modals/edit-modal/edit-modal.component";
import { ErrorModalComponent } from "./components/modals/error-modal/error-modal.component";
import { ModalsComponent } from "./components/modals/modals.component";
import { SignUpModalComponent } from "./components/modals/sign-up-modal/sign-up-modal.component";
import { ViewMovieModalComponent } from "./components/modals/view-movie-modal/view-movie-modal.component";
import { MoviesGridComponent } from "./components/movies-grid/movies-grid.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomepageComponent,
    MemberComponent,
    ModalsComponent,
    MoviesGridComponent,
    AddMovieModalComponent,
    EditModalComponent,
    ErrorModalComponent,
    SignUpModalComponent,
    ViewMovieModalComponent,
    ToolbarComponent,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
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
    MatSelectModule
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    RouterModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent],
  entryComponents: [
    EditModalComponent,
    ErrorModalComponent,
    ViewMovieModalComponent,
    AddMovieModalComponent,
    AddParticipantModalComponent,
    SignUpModalComponent
  ],
})
export class AppModule { }
