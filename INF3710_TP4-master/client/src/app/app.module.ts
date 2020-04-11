import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent, appRoutes } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatMenuModule} from '@angular/material/menu';
import { MoviesGridComponent } from './components/movies-grid/movies-grid.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { EditModalComponent } from './components/modals/edit-modal/edit-modal.component';
import { FormsModule } from '@angular/forms';
import { ErrorModalComponent } from './components/modals/error-modal/error-modal.component';
import { ViewMovieModalComponent } from './components/modals/view-movie-modal/view-movie-modal.component';
import { AddMovieModalComponent } from './components/modals/add-movie-modal/add-movie-modal.component';
import { AddParticipantModalComponent } from './components/modals/add-participant-modal/add-participant-modal.component';
import { SignUpModalComponent } from './components/modals/sign-up-modal/sign-up-modal.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RouterModule } from '@angular/router';
import { MemberComponent } from './components/member/member.component';
import { AdminComponent } from './components/admin/admin.component';
import { CommunicationService } from "./components/services/communication-service/communication.service";
import { MemberService } from "./components/services/member-service/memberService";
import { MembersGridComponent } from './components/members-grid/members-grid.component';


@NgModule({
    declarations: [AppComponent, ToolbarComponent, MoviesGridComponent, EditModalComponent, ErrorModalComponent, ViewMovieModalComponent, AddMovieModalComponent, AddParticipantModalComponent, SignUpModalComponent, HomepageComponent, MemberComponent, AdminComponent, MembersGridComponent],
    imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, MatToolbarModule, MatMenuModule, RouterModule,
              MatGridListModule, MatIconModule, MatDialogModule, FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatOptionModule, MatSelectModule, RouterModule.forRoot(appRoutes)],
    providers: [MatDialogModule, CommunicationService, MoviesGridComponent, MemberService, MembersGridComponent],
    bootstrap: [AppComponent],
    entryComponents: [EditModalComponent, ErrorModalComponent, ViewMovieModalComponent, AddMovieModalComponent, AddParticipantModalComponent, SignUpModalComponent],
})
export class AppModule {}
