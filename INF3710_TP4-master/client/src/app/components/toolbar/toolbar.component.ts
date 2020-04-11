import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Membre } from 'src/app/Membre';
import { AddMovieModalComponent } from '../modals/add-movie-modal/add-movie-modal.component';
import { AddParticipantModalComponent } from '../modals/add-participant-modal/add-participant-modal.component';
import { SignUpModalComponent } from '../modals/sign-up-modal/sign-up-modal.component';
import { MemberService } from "../services/member-service/memberService";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {

  constructor(public addMovieDialog: MatDialog,
             public signUpDialog: MatDialog, 
             public addParticipantDialog: MatDialog, 
             public memberService: MemberService, 
             public router: Router) { }
  public activeMember: Membre | null = null;
  public dialogRef: any;
  public afficher: boolean = true;

  @Output() whichGrid: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    this.memberService.obsMember.subscribe((obsMember: Membre | null) => this.activeMember = obsMember);
  }

  logOut() {
    this.router.navigateByUrl('/');
  }

  addMovie() {
    this.addMovieDialog.open(AddMovieModalComponent, {});
  }

  addParticipant() {
    this.addParticipantDialog.open(AddParticipantModalComponent, {});
  }

  signUp() {
    this.signUpDialog.open(SignUpModalComponent);
  }

  toggle(grid: string) {
    this.whichGrid.emit(grid);
  }

}
