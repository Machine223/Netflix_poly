import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParticpantModalComponent } from './add-particpant-modal.component';

describe('AddParticpantModalComponent', () => {
  let component: AddParticpantModalComponent;
  let fixture: ComponentFixture<AddParticpantModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParticpantModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParticpantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
