import { Injectable } from '@angular/core';
import { Membre } from "../../../Membre";
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MemberService {
  defaultMember: Membre | null = null;
  private activeMember = new BehaviorSubject(this.defaultMember);
  obsMember = this.activeMember.asObservable();
  constructor() {
  }
  setActiveMember(newMember: Membre | null) {
    this.activeMember.next(newMember);
  }
}
